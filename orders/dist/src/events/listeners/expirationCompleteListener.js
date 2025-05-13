"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpirationCompleteListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const mongoose_1 = __importDefault(require("mongoose"));
const orderCancelledPublisher_1 = require("../publishers/orderCancelledPublisher");
const natsWrapper_1 = require("../../natsWrapper");
class ExpirationCompleteListener extends common_1.BaseListener {
    subject = common_1.Subjects.ExpirationComplete;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        // @ts-ignore
        const parsedData = typeof data === "string" ? JSON.parse(data) : data;
        console.log(parsedData, 'parsedData');
        const fetchedOrder = await global.DBModels.ORDER?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(parsedData?.orderId),
        });
        if (!fetchedOrder?._id) {
            throw new common_1.NotFoundError(`The requested ticket was not found!`);
        }
        fetchedOrder.set({
            status: common_1.OrderStatus.Cancelled
        });
        await fetchedOrder?.save();
        new orderCancelledPublisher_1.OrderCancelledPublisher(natsWrapper_1.natsWrapper.client).publish({
            id: fetchedOrder?._id?.toString?.() || "",
            version: fetchedOrder?.version,
            ticket: {
                id: fetchedOrder?.ticket?._id?.toString?.() || ""
            }
        });
        msg?.ack();
    }
}
exports.ExpirationCompleteListener = ExpirationCompleteListener;
;
