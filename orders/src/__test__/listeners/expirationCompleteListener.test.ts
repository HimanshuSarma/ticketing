import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { IExpirationCompleteEvent, OrderStatus } from "@himanshusarmaorg/common";
import { natsWrapper } from "../../natsWrapper";
import { ExpirationCompleteListener } from "../../events/listeners/expirationCompleteListener";
import { Message } from "node-nats-streaming";

jest.mock("../../natsWrapper");

const setup = async () => {
  const listener = new ExpirationCompleteListener(
    natsWrapper.client
  );

  // create a ticket...
  const newTicket = new global.DBModels.TICKET({
    title: "title1",
    price: 100,
  });

  await newTicket.save();

  // create an order
  const newOrder = new global.DBModels.ORDER({
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId()?.toHexString?.(),
    expiresAt: Date.now() + 10000,
    ticket: newTicket?._id,
  });

  await newOrder.save();

  const data: IExpirationCompleteEvent["data"] = {
    orderId: newOrder?._id?.toString?.() || ""
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

describe("expiration complete listener",  () => {
  it("checks the status of an order after expiration:complete", async () => {

    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

    const fetchedOrder = await global?.DBModels?.ORDER?.findOne({
      _id: new mongoose.Types.ObjectId(data?.orderId)?.toString(),
    });

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData?.id).toBeDefined();

    expect(fetchedOrder?._id)?.toBeDefined();
    expect(fetchedOrder?.status)?.toBe(OrderStatus.Cancelled);
  });
});