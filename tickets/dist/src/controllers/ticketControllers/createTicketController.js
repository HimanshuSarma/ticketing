"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createTicketSchema_1 = __importDefault(require("../../validationSchemas/ticketValidationSchemas/createTicketSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const ticketCreatedPublisher_1 = require("../../events/publishers/ticketCreatedPublisher");
const natsWrapper_1 = require("../../natsWrapper");
const createTicketController = {
    validation: (async (req, res, next) => {
        try {
            console.log(req?.user, req?.body, "createTicketControllerValidation");
            const parsedBody = createTicketSchema_1.default.parse({
                ...req.body,
                userId: req?.user?._id
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
        try {
            const newTicket = new global.DBModels.TICKET({
                ...req?.body,
                userId: req?.user?._id
            });
            await newTicket?.save();
            res.status(200).send(newTicket);
            console.log(`ticket-srv`, newTicket);
            new ticketCreatedPublisher_1.TicketCreatedPublisher(natsWrapper_1.natsWrapper?.client).publish({
                id: newTicket?._id?.toString() || "",
                title: newTicket?.title,
                price: newTicket?.price,
                userId: newTicket?.userId?.toString(),
                version: newTicket?.version
            });
        }
        catch (err) {
            console.log(err, "handlerError");
            const error = err;
            throw new common_2.GeneralError(error?.message);
        }
    })
};
exports.default = createTicketController;
