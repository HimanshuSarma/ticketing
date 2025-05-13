"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const fetchOrderByIdSchema_1 = __importDefault(require("../../validationSchemas/orderValidationSchemas/fetchOrderByIdSchema"));
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
const fetchOrderByIdController = {
    validation: (async (req, res, next) => {
        try {
            console.log(req?.user, req?.body, "createOrderControllerValidation");
            const parsedQueryParams = fetchOrderByIdSchema_1.default.parse({
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
        const fetchedOrder = await global.DBModels.ORDER.findOne({
            _id: new mongoose_1.default.Types.ObjectId(req?.query?.orderId),
            userId: new mongoose_1.default.Types.ObjectId(req?.user?._id)
        })
            .populate("ticket");
        if (!fetchedOrder?._id) {
            throw new common_2.NotFoundError("No order was found");
        }
        res.status(200).send(fetchedOrder);
        // new TicketCreatedPublisher(natsWrapper?.client).publish(
        //   {
        //     id: newTicket?._id?.toString() || "",
        //     title: newTicket?.title,
        //     price: newTicket?.price,
        //     userId: newTicket?.userId?.toString(),
        //   }
        // );
    })
};
exports.default = fetchOrderByIdController;
