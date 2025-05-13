"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const createOrderSchema_1 = __importDefault(require("../../validationSchemas/orderValidationSchemas/createOrderSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const orderCreatedPublisher_1 = require("../../events/publishers/orderCreatedPublisher");
const natsWrapper_1 = require("../../natsWrapper");
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
const createOrderController = {
    validation: (async (req, res, next) => {
        try {
            console.log(req?.user, req?.body, "createOrderControllerValidation");
            const parsedBody = createOrderSchema_1.default.parse({
                ...req.body,
                // userId: req?.user?._id
            });
            req.body = parsedBody;
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
        const fetchedTicket = await global.DBModels.TICKET.findOne({
            _id: new mongoose_1.default.Types.ObjectId(req?.body?.ticketId?.toString())
        });
        if (!fetchedTicket?._id) {
            throw new common_2.NotFoundError("The request ticket was not found");
        }
        const isReserved = await fetchedTicket?.isReserved();
        if (isReserved) {
            throw new common_1.BadRequestError("Ticket is already reserved!");
        }
        // Build the order and save it to db...
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
        const newOrder = new global.DBModels.ORDER({
            userId: new mongoose_1.default.Types.ObjectId(req?.user?._id),
            status: common_1.OrderStatus.Created,
            expiresAt: expiration,
            ticket: fetchedTicket?._id
        });
        await newOrder.save();
        res.status(200).send(newOrder);
        new orderCreatedPublisher_1.OrderCreatedPublisher(natsWrapper_1.natsWrapper?.client).publish({
            version: newOrder?.version,
            status: newOrder?.status,
            id: newOrder?._id?.toString() || "",
            userId: newOrder?.userId?.toString(),
            expiresAt: newOrder?.expiresAt?.toISOString(),
            ticket: {
                id: newOrder?.ticket?._id?.toString() || "",
                price: newOrder?.ticket?.price
            }
        });
    })
};
exports.default = createOrderController;
