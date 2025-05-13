import { BaseListener, NotFoundError, OrderCancelledEvent, OrderStatus, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose, { HydratedDocument } from "mongoose";

class OrderCancelledListener extends BaseListener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message): Promise<void> {
    try {
      // @ts-ignore
      const parsedData: OrderCancelledEvent["data"] = typeof data === "string" ? JSON.parse(data) : data;

      const fetchedOrders = await global.DBModels.ORDER.find({});

      console.log(parsedData, fetchedOrders, "parsedData")

      const fetchedOrder = await global.DBModels.ORDER.findByEvent({
        id: parsedData?.id,
        version: parsedData?.version
      });

      if (!fetchedOrder?.id) {
        throw new NotFoundError(`The order was not found - payment-srv`);
      }

      fetchedOrder.set({
        status: OrderStatus.Cancelled
      });

      await fetchedOrder.save();

      msg.ack();
    } catch (err) {
      console.log(err, "OrderCreatedListenerErr")
    }
  }
};

export {
  OrderCancelledListener
};