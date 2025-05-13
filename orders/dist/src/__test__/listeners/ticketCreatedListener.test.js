"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const natsWrapper_1 = require("../../natsWrapper");
const ticketCreatedListener_1 = require("../../events/listeners/ticketCreatedListener");
jest.mock("../../natsWrapper");
const setup = async () => {
    const listener = new ticketCreatedListener_1.TicketCreatedListener(natsWrapper_1.natsWrapper.client);
    const data = {
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: "title1",
        price: 150,
        userId: new mongoose_1.default.Types.ObjectId().toHexString(),
        version: 0
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
describe("ticket created listener", () => {
    it("creates and saves a ticket and acks the message", async () => {
        const { listener, data, msg } = await setup();
        await listener.onMessage(data, msg);
        expect(msg.ack).toHaveBeenCalled();
        const fetchedTicket = await global?.DBModels?.TICKET?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(data?.id)?.toString(),
            version: data?.version
        });
        // expect(fetchedTicket?.).toBeDefined();
        expect(fetchedTicket?.title).toBe(data?.title);
        expect(fetchedTicket?.price).toBe(data?.price);
    });
});
