import { BaseListener, NotFoundError, OrderCreatedEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose, { HydratedDocument } from "mongoose";
// import { TicketUpdatedPublisher } from "../publishers/ticketUpdatedPublisher";
import { ITicketSchema } from "../../models/TicketModel";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
    try {
      // @ts-ignore
      const parsedData: OrderCreatedEvent["data"] = typeof data === "string" ? JSON.parse(data) : data;

      console.log(parsedData, "parsedData")

      const newOrder = new global.DBModels.ORDER({
        ...parsedData,
        _id: new mongoose.Types.ObjectId(parsedData?.id),
        price: parsedData?.ticket?.price
      });

      await newOrder.save();

      msg.ack();
    } catch (err) {
      console.log(err, "OrderCreatedListenerErr")
    }
  }
};

export {
  OrderCreatedListener
};