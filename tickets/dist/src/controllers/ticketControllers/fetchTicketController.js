"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fetchTicketSchema_1 = __importDefault(require("../../validationSchemas/ticketValidationSchemas/fetchTicketSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const mongoose_1 = __importDefault(require("mongoose"));
const fetchTicketController = {
    validation: (async (req, res, next) => {
        try {
            const parsedParams = fetchTicketSchema_1.default.parse(req.params);
            req.params = parsedParams;
            next();
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                // Send a 400 Bad Request with validation errors
                throw new common_1.RequestValidationError(err);
            }
            throw new common_2.GeneralError();
        }
    }),
    handler: (async (req, res, next) => {
        try {
            const fetchedTicket = await global.DBModels.TICKET.findOne({
                _id: new mongoose_1.default.Types.ObjectId(req.params.id),
                userId: new mongoose_1.default.Types.ObjectId(req.params?.userId)
            });
            res.status(200).send(fetchedTicket);
        }
        catch (err) {
            console.log(err, "handlerError");
            const error = err;
            throw new common_2.GeneralError(error?.message);
        }
    })
};
exports.default = fetchTicketController;
