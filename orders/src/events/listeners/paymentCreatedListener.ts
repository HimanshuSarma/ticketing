import { BaseListener, NotFoundError, QueueGroupName, Subjects, IPaymentCreatedEvent, OrderStatus } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose from "mongoose";

class PaymentCreatedListener extends BaseListener<IPaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: IPaymentCreatedEvent["data"], msg: Message): Promise<void> {

    // @ts-ignore
    const parsedData: IPaymentCreatedEvent["data"] = typeof data === "string" ? JSON.parse(data) : data;

    console.log(parsedData,'parsedData');

    const fetchedOrder = await global.DBModels.ORDER?.findOne({
      _id: new mongoose.Types.ObjectId(parsedData?.orderId),
    });

    if (!fetchedOrder?._id) {
      throw new NotFoundError(`The requested ticket was not found!`);
    }

    fetchedOrder.set({
      status: OrderStatus.Complete
    });

    await fetchedOrder?.save();

    // NOTE: We don't need to publish an event announcing that the order
    // has been updated, because once the Status of the order is "Complete",
    // there will be no further updates on that order

    msg?.ack();
  }
};

export {
  PaymentCreatedListener
};