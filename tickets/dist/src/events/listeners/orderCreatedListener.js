"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const mongoose_1 = __importDefault(require("mongoose"));
const ticketUpdatedPublisher_1 = require("../publishers/ticketUpdatedPublisher");
class OrderCreatedListener extends common_1.BaseListener {
    subject = common_1.Subjects.OrderCreated;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        try {
            // @ts-ignore
            const parsedData = JSON.parse(data);
            const fetchedTicket = await global.DBModels.TICKET.findOne({
                _id: new mongoose_1.default.Types.ObjectId(parsedData?.ticket?.id?.toString())
            });
            if (!fetchedTicket?._id) {
                throw new common_1.NotFoundError(`No ticket was found`);
            }
            fetchedTicket?.set({
                orderId: parsedData?.id,
            });
            await fetchedTicket?.save();
            await new ticketUpdatedPublisher_1.TicketUpdatedPublisher(this.client).publish({
                id: fetchedTicket?._id?.toString?.(),
                title: fetchedTicket?.title,
                price: fetchedTicket?.price,
                version: fetchedTicket?.version,
                orderId: fetchedTicket?.orderId?.toString?.()
            });
            msg?.ack?.();
            console.log(`OrderCreatedListener-ticket-srv`, fetchedTicket);
        }
        catch (err) {
            console.log(err, "OrderCreatedListenerErr");
        }
    }
}
exports.OrderCreatedListener = OrderCreatedListener;
;
