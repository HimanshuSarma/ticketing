"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
class OrderCancelledListener extends common_1.BaseListener {
    subject = common_1.Subjects.OrderCancelled;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        try {
            // @ts-ignore
            const parsedData = typeof data === "string" ? JSON.parse(data) : data;
            const fetchedOrders = await global.DBModels.ORDER.find({});
            console.log(parsedData, fetchedOrders, "parsedData");
            const fetchedOrder = await global.DBModels.ORDER.findByEvent({
                id: parsedData?.id,
                version: parsedData?.version
            });
            if (!fetchedOrder?.id) {
                throw new common_1.NotFoundError(`The order was not found - payment-srv`);
            }
            fetchedOrder.set({
                status: common_1.OrderStatus.Cancelled
            });
            await fetchedOrder.save();
            msg.ack();
        }
        catch (err) {
            console.log(err, "OrderCreatedListenerErr");
        }
    }
}
exports.OrderCancelledListener = OrderCancelledListener;
;
