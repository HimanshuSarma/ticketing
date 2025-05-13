"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("@himanshusarmaorg/common");
const natsWrapper_1 = require("../../natsWrapper");
const orderCreatedListener_1 = require("../../events/listeners/orderCreatedListener");
jest.mock("../../natsWrapper");
const setup = async () => {
    const listener = new orderCreatedListener_1.OrderCreatedListener(natsWrapper_1.natsWrapper.client);
    const userId = new mongoose_1.default.Types.ObjectId;
    const orderId = new mongoose_1.default.Types.ObjectId;
    const ticketId = new mongoose_1.default.Types.ObjectId;
    const data = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        status: common_1.OrderStatus["Created"],
        userId: userId?.toString(),
        version: 0,
        expiresAt: "",
        ticket: {
            id: ticketId?.toString?.() || "",
            price: 100
        }
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
describe("order created listener", () => {
    it("creates and saves an order and acks the message", async () => {
        const { listener, data, msg } = await setup();
        await listener.onMessage(data, msg);
        expect(msg.ack).toHaveBeenCalled();
        const fetchedOrder = await global?.DBModels?.ORDER?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(data?.id)?.toString(),
        });
        console.log(fetchedOrder, "fetchedOrder");
        // expect(fetchedOrder?.).toBeDefined();
        expect(fetchedOrder?.id?.toString?.()).toBe(data?.id);
        expect(fetchedOrder?.userId?.toString?.()).toBe(data?.userId);
    });
});
