"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@himanshusarmaorg/common");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
;
;
const ticketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    version: {
        type: Number,
        // required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
ticketSchema.methods.isReserved = async function () {
    const existingOrder = await global.DBModels.ORDER.findOne({
        ticket: this?._id,
        status: {
            $in: [
                common_1.OrderStatus.Created,
                common_1.OrderStatus.AwaitingPayment,
                common_1.OrderStatus.Complete
            ]
        }
    });
    return Boolean(existingOrder?._id);
};
ticketSchema.statics.findByEvent = async function (event) {
    const fetchedTicket = await global.DBModels.TICKET?.findOne({
        _id: new mongoose_1.default.Types.ObjectId(event?.id?.toString?.()),
        version: event?.version - 1
    });
    return fetchedTicket;
};
const TicketModel = mongoose_1.default.model("Ticket", ticketSchema);
exports.default = TicketModel;
