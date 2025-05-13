import { BaseListener, NotFoundError, QueueGroupName, Subjects, IExpirationCompleteEvent, OrderStatus } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose from "mongoose";
import { OrderCancelledPublisher } from "../publishers/orderCancelledPublisher";
import { natsWrapper } from "../../natsWrapper";

class ExpirationCompleteListener extends BaseListener<IExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName: string = queueGroupName;

  async onMessage(data: IExpirationCompleteEvent["data"], msg: Message): Promise<void> {

    // @ts-ignore
    const parsedData: IExpirationCompleteEvent["data"] = typeof data === "string" ? JSON.parse(data) : data;

    console.log(parsedData,'parsedData');

    const fetchedOrder = await global.DBModels.ORDER?.findOne({
      _id: new mongoose.Types.ObjectId(parsedData?.orderId),
    });

    if (!fetchedOrder?._id) {
      throw new NotFoundError(`The requested ticket was not found!`);
    }

    if (fetchedOrder?.status === OrderStatus.Complete) {
      return msg.ack();
    }

    fetchedOrder.set({
      status: OrderStatus.Cancelled
    });

    await fetchedOrder?.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: fetchedOrder?._id?.toString?.() || "",
      version: fetchedOrder?.version,
      ticket: {
        id: fetchedOrder?.ticket?._id?.toString?.() || ""
      }
    });

    msg?.ack();
  }
};

export {
  ExpirationCompleteListener
};