"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCreatedListener = void 0;
const common_1 = require("@himanshusarmaorg/common");
const queueGroupName_1 = require("./queueGroupName");
const mongoose_1 = __importDefault(require("mongoose"));
class TicketCreatedListener extends common_1.BaseListener {
    subject = common_1.Subjects.TicketCreated;
    queueGroupName = queueGroupName_1.queueGroupName;
    async onMessage(data, msg) {
        try {
            // @ts-ignore
            const parsedData = typeof data === "string" ? JSON.parse(data || "") : data;
            const newTicket = new global.DBModels.TICKET({
                ...parsedData,
                _id: new mongoose_1.default.Types.ObjectId(parsedData?.id),
                userId: new mongoose_1.default.Types.ObjectId(parsedData?.userId)
            });
            console.log("data", newTicket);
            await newTicket.save();
            console.log(newTicket, "newTicket");
            msg.ack();
        }
        catch (err) {
            console.log(`TicketCreatedListenerErr`, err);
        }
    }
}
exports.TicketCreatedListener = TicketCreatedListener;
;
