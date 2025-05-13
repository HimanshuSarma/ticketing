import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus, TicketCreatedEvent } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { OrderCreatedListener } from "../../events/listeners/orderCreatedListener";
import { Message } from "node-nats-streaming";

jest.mock("../../natsWrapper");

const setup = async () => {
  const listener = new OrderCreatedListener(
    natsWrapper.client
  );

  const userId = new mongoose.Types.ObjectId;
  const orderId = new mongoose.Types.ObjectId;

  const newTicket = new global.DBModels.TICKET({
    title: "title",
    price: 100,
    userId,
    orderId
  });

  await newTicket.save();

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus["Created"],
    userId: userId?.toString(), 
    version: 0,
    expiresAt: "",
    ticket: {
      id: newTicket?._id?.toString?.() || "",
      price: 100
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    newTicket,
    listener,
    data,
    msg
  };
};

describe("order created listener",  () => {
  it("creates and saves an order and acks the message", async () => {

    const { newTicket, listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

    const fetchedTicket = await global?.DBModels?.TICKET?.findOne({
      _id: new mongoose.Types.ObjectId(newTicket?.id)?.toString(),
    });

    console.log(fetchedTicket, "fetchedTicket")

    // expect(fetchedTicket?.).toBeDefined();
    expect(fetchedTicket?.orderId?.toString?.()).toBe(data?.id);
    expect(fetchedTicket?.userId?.toString?.()).toBe(data?.userId);
  });


  it("publishes a ticket updating event", async () => {

    const { newTicket, listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});