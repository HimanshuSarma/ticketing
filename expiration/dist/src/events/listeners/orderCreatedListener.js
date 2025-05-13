"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const expirationQueue_1 = require("../../queues/expirationQueue");
class OrderCreatedListener extends common_1.BaseListener {
    subject = common_1.Subjects.OrderCreated;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        // @ts-ignore
        const parsedData = JSON.parse(data);
        console.log(data, data?.id, parsedData, "OrderCreatedListener-expiration");
        await expirationQueue_1.expirationQueue.add({
            orderId: parsedData?.id
        });
        msg.ack();
    }
}
exports.OrderCreatedListener = OrderCreatedListener;
;
