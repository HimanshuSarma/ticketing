"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const orderCancelledPublisher_1 = require("../../events/publishers/orderCancelledPublisher");
const natsWrapper_1 = require("../../natsWrapper");
const deleteOrderSchema_1 = __importDefault(require("../../validationSchemas/orderValidationSchemas/deleteOrderSchema"));
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
const deleteOrderController = {
    validation: (async (req, res, next) => {
        try {
            console.log(req?.user, req?.query, "deleteOrderControllerValidation");
            const parsedQueryParams = deleteOrderSchema_1.default.parse({
                ...req.query,
                // userId: req?.user?._id
            });
            req.query = parsedQueryParams;
            next();
        }
        catch (err) {
            console.log(err, "validationError");
            if (err instanceof zod_1.z.ZodError) {
                // Send a 400 Bad Request with validation errors
                throw new common_1.RequestValidationError(err);
            }
            throw new common_2.GeneralError();
        }
    }),
    handler: (async (req, res, next) => {
        const cancelledOrder = await global.DBModels.ORDER.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(req?.query?.orderId),
            userId: new mongoose_1.default.Types.ObjectId(req?.user?._id)
        }, {
            status: common_1.OrderStatus.Cancelled
        }, {
            new: true
        }).populate("ticket");
        if (!cancelledOrder?._id) {
            throw new common_2.NotFoundError("No order was found");
        }
        res.status(200).send(cancelledOrder);
        new orderCancelledPublisher_1.OrderCancelledPublisher(natsWrapper_1.natsWrapper?.client).publish({
            id: cancelledOrder?._id?.toString() || "",
            ticket: {
                id: cancelledOrder?.ticket?._id?.toString?.() || "",
            },
            version: cancelledOrder?.version
        });
    })
};
exports.default = deleteOrderController;
