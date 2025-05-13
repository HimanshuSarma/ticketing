"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const mongoose_1 = __importDefault(require("mongoose"));
const ticketUpdatedPublisher_1 = require("../publishers/ticketUpdatedPublisher");
class OrderCancelledListener extends common_1.BaseListener {
    subject = common_1.Subjects.OrderCancelled;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        const fetchedTicket = await global.DBModels.TICKET.findOne({
            _id: new mongoose_1.default.Types.ObjectId(data?.ticket?.id?.toString())
        });
        if (!fetchedTicket?._id) {
            throw new common_1.NotFoundError(`No ticket was found`);
        }
        fetchedTicket?.set({
            orderId: null,
        });
        await fetchedTicket?.save();
        await new ticketUpdatedPublisher_1.TicketUpdatedPublisher(this.client).publish({
            ...fetchedTicket,
            id: fetchedTicket?._id?.toString?.(),
            orderId: ""
        });
        msg?.ack?.();
    }
}
exports.OrderCancelledListener = OrderCancelledListener;
;
