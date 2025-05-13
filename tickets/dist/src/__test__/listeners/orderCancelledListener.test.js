"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const natsWrapper_1 = require("../../natsWrapper");
const orderCancelledListener_1 = require("../../events/listeners/orderCancelledListener");
jest.mock("../../natsWrapper");
const setup = async () => {
    const listener = new orderCancelledListener_1.OrderCancelledListener(natsWrapper_1.natsWrapper.client);
    const userId = new mongoose_1.default.Types.ObjectId;
    const orderId = new mongoose_1.default.Types.ObjectId;
    const newTicket = new global.DBModels.TICKET({
        title: "title",
        price: 100,
        userId,
        orderId
    });
    await newTicket.save();
    const data = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: newTicket?._id?.toString?.() || "",
        }
    };
    // @ts-ignore
    const msg = {
        ack: jest.fn()
    };
    return {
        newTicket,
        listener,
        data,
        msg
    };
};
describe("order cancelled listener", () => {
    it("creates and saves an order and acks the message", async () => {
        const { newTicket, listener, data, msg } = await setup();
        await listener.onMessage(data, msg);
        const updatedTicket = await global.DBModels.TICKET.findOne({
            _id: newTicket?._id
        });
        console.log(updatedTicket, "updatedTicket");
        expect(updatedTicket?.orderId).toBe(null);
        expect(msg.ack).toHaveBeenCalled();
        expect(natsWrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
    });
});
