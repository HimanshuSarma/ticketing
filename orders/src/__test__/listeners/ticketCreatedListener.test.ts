import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { TicketCreatedEvent } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { TicketCreatedListener } from "../../events/listeners/ticketCreatedListener";
import { Message } from "node-nats-streaming";

jest.mock("../../natsWrapper");

const setup = async () => {
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

describe("ticket created listener",  () => {
  it("creates and saves a ticket and acks the message", async () => {

    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

    const fetchedTicket = await global?.DBModels?.TICKET?.findOne({
      _id: new mongoose.Types.ObjectId(data?.id)?.toString(),
      version: data?.version
    });

    // expect(fetchedTicket?.).toBeDefined();
    expect(fetchedTicket?.title).toBe(data?.title);
    expect(fetchedTicket?.price).toBe(data?.price);
  });
});