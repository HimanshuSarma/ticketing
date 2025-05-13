import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderCreatedEvent, OrderStatus, TicketCreatedEvent } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { OrderCancelledListener } from "../../events/listeners/orderCancelledListener";
import { Message } from "node-nats-streaming";
import { OrderCreatedListener } from "../../events/listeners/orderCreatedListener";

jest.mock("../../natsWrapper");

const setup = async () => {
  const listener = new OrderCancelledListener(
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

  const data: OrderCancelledEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: newTicket?._id?.toString?.() || "",
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

describe("order cancelled listener",  () => {
  it("creates and saves an order and acks the message", async () => {

    const { newTicket, listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await global.DBModels.TICKET.findOne({
      _id: newTicket?._id
    });

    console.log(updatedTicket, "updatedTicket");

    expect(updatedTicket?.orderId).toBe(null);
    expect(msg.ack).toHaveBeenCalled();

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});