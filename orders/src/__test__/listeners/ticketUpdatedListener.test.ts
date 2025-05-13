import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { TicketCreatedEvent, TicketUpdatedEvent } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { Message } from "node-nats-streaming";
import { TicketUpdatedListener } from "../../events/listeners/ticketUpdatedListener";
import { TicketCreatedListener } from "../../events/listeners/ticketCreatedListener";

jest.mock("../../natsWrapper");

const createTicketHandler = async () => {
  const listener = new TicketCreatedListener(
    natsWrapper.client
  );

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "title1",
    price: 150,
    userId: new mongoose.Types.ObjectId().toHexString(), 
    version: 0
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    data,
    msg
  };
};

const setup = async (
  { title, price, version, id } : 
  { title?: string, price?: number, version?: number, id: string }
) => {
  const listener = new TicketUpdatedListener(
    natsWrapper.client
  );

  const data: TicketUpdatedEvent["data"] = {
    id: new mongoose.Types.ObjectId(id)?.toHexString?.(),
    title: title || "title1-edited",
    price: price || 150,
    // userId: new mongoose.Types.ObjectId().toHexString(), 
    version: version || 1
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    data,
    msg
  };
};

describe("ticket updated listener",  () => {
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
      _id: new mongoose.Types.ObjectId(createTicketData?.id)?.toString(),
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
        _id: new mongoose.Types.ObjectId(createTicketData?.id)?.toString(),
        version: data?.version
      });

      // expect(fetchedTicket?.).toBeDefined();
      expect(fetchedTicket?.title).toBe(data?.title);
      expect(fetchedTicket?.price).toBe(data?.price);
    } catch (err) {
      console.log(err, "does not ack error message");
    }
    
    expect(msg.ack).not.toHaveBeenCalled();

  });
});