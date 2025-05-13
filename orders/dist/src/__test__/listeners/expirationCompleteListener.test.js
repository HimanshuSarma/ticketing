"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("@himanshusarmaorg/common");
const natsWrapper_1 = require("../../natsWrapper");
const expirationCompleteListener_1 = require("../../events/listeners/expirationCompleteListener");
jest.mock("../../natsWrapper");
const setup = async () => {
    const listener = new expirationCompleteListener_1.ExpirationCompleteListener(natsWrapper_1.natsWrapper.client);
    // create a ticket...
    const newTicket = new global.DBModels.TICKET({
        title: "title1",
        price: 100,
    });
    await newTicket.save();
    // create an order
    const newOrder = new global.DBModels.ORDER({
        status: common_1.OrderStatus.Created,
        userId: new mongoose_1.default.Types.ObjectId()?.toHexString?.(),
        expiresAt: Date.now() + 10000,
        ticket: newTicket?._id,
    });
    await newOrder.save();
    const data = {
        orderId: newOrder?._id?.toString?.() || ""
    };
    // @ts-ignore
    const msg = {
        ack: jest.fn()
    };
    return {
        listener,
        data,
        msg
    };
};
describe("expiration complete listener", () => {
    it("checks the status of an order after expiration:complete", async () => {
        const { listener, data, msg } = await setup();
        await listener.onMessage(data, msg);
        expect(msg.ack).toHaveBeenCalled();
        const fetchedOrder = await global?.DBModels?.ORDER?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(data?.orderId)?.toString(),
        });
        expect(natsWrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
        const eventData = JSON.parse(natsWrapper_1.natsWrapper.client.publish.mock.calls[0][1]);
        expect(eventData?.id).toBeDefined();
        expect(fetchedOrder?._id)?.toBeDefined();
        expect(fetchedOrder?.status)?.toBe(common_1.OrderStatus.Cancelled);
    });
});
