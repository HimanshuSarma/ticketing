"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createPaymentSchema_1 = __importDefault(require("../../validationSchemas/paymentsValidationSchemas/createPaymentSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const mongoose_1 = __importDefault(require("mongoose"));
const razorpay_1 = require("../../razorpay");
const createPaymentController = {
    validation: (async (req, res, next) => {
        try {
            console.log(req?.user, req?.body, "createTicketControllerValidation");
            const parsedBody = createPaymentSchema_1.default.parse({
                ...req.body,
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
        const fetchedOrder = await global.DBModels.ORDER?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(req?.body?.orderId)
        });
        console.log(fetchedOrder, req?.user, "fetchedOrder");
        if (!fetchedOrder?._id) {
            throw new common_1.NotFoundError(`The requested order was not found!`);
        }
        if (fetchedOrder?.userId?.toString?.() !== req?.user?.id) {
            throw new common_1.BadRequestError(`The requested order doesn't belong to this user!`);
        }
        if (fetchedOrder?.status === common_1.OrderStatus.Cancelled) {
            throw new common_1.BadRequestError(`The requested order has been cancelled!`);
        }
        const options = {
            // amount should be in the smallest denomination. Here, it should be in paise
            amount: fetchedOrder?.price * 100,
            // amount: 5000,
            currency: 'INR',
            receipt: fetchedOrder?._id?.toString?.() || "",
            payment_capture: 1
        };
        const razorpayRes = await razorpay_1.razorpay.orders.create(options);
        console.log(`payments-srv`, fetchedOrder, razorpayRes);
        res.status(200).send({
            fetchedOrder,
            paymentRes: razorpayRes
        });
        // new TicketCreatedPublisher(natsWrapper?.client).publish(
        //   {
        //     id: newTicket?._id?.toString() || "",
        //     title: newTicket?.title,
        //     price: newTicket?.price,
        //     userId: newTicket?.userId?.toString(),
        //     version: newTicket?.version
        //   }
        // );
    })
};
exports.default = createPaymentController;
