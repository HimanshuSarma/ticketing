"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
const fetchOrdersController = {
    validation: (async (req, res, next) => {
        try {
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
        const fetchedOrders = await global.DBModels.ORDER.find({
            userId: new mongoose_1.default.Types.ObjectId(req?.user?._id?.toString())
        })
            .populate("ticket");
        if (!fetchedOrders) {
            throw new common_2.NotFoundError("No orders were found");
        }
        res.status(200).send(fetchedOrders);
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
exports.default = fetchOrdersController;
