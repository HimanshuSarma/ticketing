import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderCreatedEvent, OrderStatus } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { OrderCancelledListener } from "../../events/listeners/orderCancelledListener";
import { Message } from "node-nats-streaming";
import { OrderCreatedListener } from "../../events/listeners/orderCreatedListener";

jest.mock("../../natsWrapper");

const createOrderHandler = async () => {
  const orderCreatedListener = new OrderCreatedListener(
    natsWrapper.client
  );

  const ticketId = new mongoose.Types.ObjectId;
  const userId = new mongoose.Types.ObjectId;

  const orderCreatedData: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
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
  }
};

const setup = async ({
  orderId
} : {
  orderId: string
}) => {
  const listener = new OrderCancelledListener(
    natsWrapper.client
  );

  const ticketId = new mongoose.Types.ObjectId;

  const data: OrderCancelledEvent["data"] = {
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

describe("order cancelled listener",  () => {
  it("cancels an order and acks the message", async () => {

    // @ts-ignore
    const msg: Message = {
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
      _id: new mongoose.Types.ObjectId(data?.id)?.toString(),
    });

    console.log(fetchedOrder, "fetchedOrder")

    // expect(fetchedOrder?.).toBeDefined();
    expect(fetchedOrder?.id?.toString?.()).toBe(data?.id);
    expect(fetchedOrder?.status).toBe(OrderStatus.Cancelled);
  });
});