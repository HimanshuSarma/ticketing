import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@himanshusarmaorg/common";
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
  const ticketId = new mongoose.Types.ObjectId;

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus["Created"],
    userId: userId?.toString(), 
    version: 0,
    expiresAt: "",
    ticket: {
      id: ticketId?.toString?.() || "",
      price: 100
    }
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

describe("order created listener",  () => {
  it("creates and saves an order and acks the message", async () => {

    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

    const fetchedOrder = await global?.DBModels?.ORDER?.findOne({
      _id: new mongoose.Types.ObjectId(data?.id)?.toString(),
    });

    console.log(fetchedOrder, "fetchedOrder")

    // expect(fetchedOrder?.).toBeDefined();
    expect(fetchedOrder?.id?.toString?.()).toBe(data?.id);
    expect(fetchedOrder?.userId?.toString?.()).toBe(data?.userId);
  });
});