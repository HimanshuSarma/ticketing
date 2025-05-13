"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("@himanshusarmaorg/common");
const natsWrapper_1 = require("../../natsWrapper");
const orderCancelledListener_1 = require("../../events/listeners/orderCancelledListener");
const orderCreatedListener_1 = require("../../events/listeners/orderCreatedListener");
jest.mock("../../natsWrapper");
const createOrderHandler = async () => {
    const orderCreatedListener = new orderCreatedListener_1.OrderCreatedListener(natsWrapper_1.natsWrapper.client);
    const ticketId = new mongoose_1.default.Types.ObjectId;
    const userId = new mongoose_1.default.Types.ObjectId;
    const orderCreatedData = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        status: common_1.OrderStatus.Created,
        userId: userId?.toHexString?.(),
        expiresAt: "",
        version: 0,
        ticket: {
            id: ticketId?.toString?.() || "",
            price: 20
        }
    };
    return {
        orderCreatedListener,
        orderCreatedData
    };
};
const setup = async ({ orderId }) => {
    const listener = new orderCancelledListener_1.OrderCancelledListener(natsWrapper_1.natsWrapper.client);
    const ticketId = new mongoose_1.default.Types.ObjectId;
    const data = {
        id: orderId,
        version: 1,
        ticket: {
            id: ticketId?.toString?.() || "",
        }
    };
    return {
        listener,
        data,
    };
};
describe("order cancelled listener", () => {
    it("cancels an order and acks the message", async () => {
        // @ts-ignore
        const msg = {
            ack: jest.fn()
        };
        const { orderCreatedData, orderCreatedListener } = await createOrderHandler();
        await orderCreatedListener.onMessage(orderCreatedData, msg);
        const { listener, data } = await setup({
            orderId: orderCreatedData?.id
        });
        await listener.onMessage(data, msg);
        expect(msg.ack).toHaveBeenCalled();
        const fetchedOrder = await global?.DBModels?.ORDER?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(data?.id)?.toString(),
        });
        console.log(fetchedOrder, "fetchedOrder");
        // expect(fetchedOrder?.).toBeDefined();
        expect(fetchedOrder?.id?.toString?.()).toBe(data?.id);
        expect(fetchedOrder?.status).toBe(common_1.OrderStatus.Cancelled);
    });
});
