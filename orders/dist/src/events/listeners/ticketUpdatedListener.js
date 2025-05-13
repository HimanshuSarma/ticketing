"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketUpdatedListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
class TicketUpdatedListener extends common_1.BaseListener {
    subject = common_1.Subjects.TicketUpdated;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        // @ts-ignore
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;
        console.log(parsedData, 'parsedData');
        const fetchedTicket = await global.DBModels.TICKET?.findByEvent({
            id: parsedData?.id,
            version: parsedData?.version
        });
        if (!fetchedTicket?._id) {
            throw new common_1.NotFoundError(`The requested ticket was not found!`);
        }
        fetchedTicket.set({
            title: parsedData?.title || fetchedTicket?.title,
            price: parsedData?.price || fetchedTicket?.price
        });
        await fetchedTicket?.save();
        msg?.ack();
    }
}
exports.TicketUpdatedListener = TicketUpdatedListener;
;
