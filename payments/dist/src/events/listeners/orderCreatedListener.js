"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const mongoose_1 = __importDefault(require("mongoose"));
class OrderCreatedListener extends common_1.BaseListener {
    subject = common_1.Subjects.OrderCreated;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        try {
            // @ts-ignore
            const parsedData = typeof data === "string" ? JSON.parse(data) : data;
            console.log(parsedData, "parsedData");
            const newOrder = new global.DBModels.ORDER({
                ...parsedData,
                _id: new mongoose_1.default.Types.ObjectId(parsedData?.id),
                price: parsedData?.ticket?.price
            });
            await newOrder.save();
            msg.ack();
        }
        catch (err) {
            console.log(err, "OrderCreatedListenerErr");
        }
    }
}
exports.OrderCreatedListener = OrderCreatedListener;
;
