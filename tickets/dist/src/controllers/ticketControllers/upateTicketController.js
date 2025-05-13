"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const updateTicketSchema_1 = __importStar(require("../../validationSchemas/ticketValidationSchemas/updateTicketSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const mongoose_1 = __importDefault(require("mongoose"));
const ticketUpdatedPublisher_1 = require("../../events/publishers/ticketUpdatedPublisher");
const natsWrapper_1 = require("../../natsWrapper");
const updateTicketController = {
    validation: (async (req, res, next) => {
        try {
            const parsedBody = updateTicketSchema_1.default.parse(req.body);
            const parsedParams = updateTicketSchema_1.updateTicketParamsSchema.parse(req.params);
            req.body = parsedBody;
            req.params = parsedParams;
            next();
        }
        catch (err) {
            console.log(err, "updateTicketControllerValidation");
            if (err instanceof zod_1.z.ZodError) {
                // Send a 400 Bad Request with validation errors
                throw new common_1.RequestValidationError(err);
            }
            throw new common_2.GeneralError();
        }
    }),
    handler: (async (req, res, next) => {
        let orderId;
        orderId = req?.body?.orderId ?
            new mongoose_1.default.Types.ObjectId(req?.body?.orderId) :
            null;
        const updatedTicket = await global.DBModels.TICKET.findOne({
            _id: new mongoose_1.default.Types.ObjectId(req.params.id),
            userId: new mongoose_1.default.Types.ObjectId(req.user?._id),
        });
        if (!updatedTicket?._id) {
            throw new common_1.NotFoundError("Ticket doesn't exist");
        }
        if (updatedTicket?.orderId) {
            if (!("orderId" in req.body) || ("orderId" in req.body && orderId)) {
                throw new common_1.BadRequestError(`Ticket is reserved`);
            }
        }
        updatedTicket.set({
            ...req?.body,
            orderId
        });
        await updatedTicket?.save();
        res.status(200).send(updatedTicket);
        new ticketUpdatedPublisher_1.TicketUpdatedPublisher(natsWrapper_1.natsWrapper.client)
            .publish({
            id: updatedTicket?._id?.toString(),
            title: updatedTicket?.title,
            price: updatedTicket?.price,
            orderId: updatedTicket?.orderId?.toString(),
            version: updatedTicket?.version
        });
    })
};
exports.default = updateTicketController;
