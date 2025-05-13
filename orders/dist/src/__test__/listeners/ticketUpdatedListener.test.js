"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const natsWrapper_1 = require("../../natsWrapper");
const ticketUpdatedListener_1 = require("../../events/listeners/ticketUpdatedListener");
const ticketCreatedListener_1 = require("../../events/listeners/ticketCreatedListener");
jest.mock("../../natsWrapper");
const createTicketHandler = async () => {
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
const setup = async ({ title, price, version, id }) => {
    const listener = new ticketUpdatedListener_1.TicketUpdatedListener(natsWrapper_1.natsWrapper.client);
    const data = {
        id: new mongoose_1.default.Types.ObjectId(id)?.toHexString?.(),
        title: title || "title1-edited",
        price: price || 150,
        // userId: new mongoose.Types.ObjectId().toHexString(), 
        version: version || 1
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
describe("ticket updated listener", () => {
    it("updates a ticket and acks the message", async () => {
        const { listener: createTicketListener, data: createTicketData, msg: createTicketMsg } = await createTicketHandler();
        const { listener, data, msg } = await setup({ id: createTicketData?.id?.toString?.() });
        console.log(data, "listener");
        await createTicketListener.onMessage(createTicketData, createTicketMsg);
        await listener.onMessage({
            ...data,
            id: createTicketData?.id?.toString(),
        }, msg);
        expect(msg.ack).toHaveBeenCalled();
        const fetchedTicket = await global?.DBModels?.TICKET?.findOne({
            _id: new mongoose_1.default.Types.ObjectId(createTicketData?.id)?.toString(),
            version: data?.version
        });
        // expect(fetchedTicket?.).toBeDefined();
        expect(fetchedTicket?.title).toBe(data?.title);
        expect(fetchedTicket?.price).toBe(data?.price);
    });
    it("does not ack the message if the event has a skipped version number", async () => {
        const { listener: createTicketListener, data: createTicketData, msg: createTicketMsg } = await createTicketHandler();
        const { listener, data, msg } = await setup({
            version: 10,
            id: createTicketData?.id?.toString?.()
        });
        try {
            await createTicketListener.onMessage(createTicketData, createTicketMsg);
            await listener.onMessage({
                ...data,
                id: createTicketData?.id?.toString(),
            }, msg);
            const fetchedTicket = await global?.DBModels?.TICKET?.findOne({
                _id: new mongoose_1.default.Types.ObjectId(createTicketData?.id)?.toString(),
                version: data?.version
            });
            // expect(fetchedTicket?.).toBeDefined();
            expect(fetchedTicket?.title).toBe(data?.title);
            expect(fetchedTicket?.price).toBe(data?.price);
        }
        catch (err) {
            console.log(err, "does not ack error message");
        }
        expect(msg.ack).not.toHaveBeenCalled();
    });
});
