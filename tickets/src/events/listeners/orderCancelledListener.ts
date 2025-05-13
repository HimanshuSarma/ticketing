import { BaseListener, NotFoundError, OrderCancelledEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose from "mongoose";
import { TicketUpdatedPublisher } from "../publishers/ticketUpdatedPublisher";

class OrderCancelledListener extends BaseListener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message): Promise<void> {
    const fetchedTicket = await global.DBModels.TICKET.findOne({
      _id: new mongoose.Types.ObjectId(data?.ticket?.id?.toString())
    });

    if (!fetchedTicket?._id) {
      throw new NotFoundError(`No ticket was found`)
    }

    fetchedTicket?.set({
      orderId: null,
    });

    await fetchedTicket?.save();

    await new TicketUpdatedPublisher(this.client).publish({
      ...fetchedTicket,
      id: fetchedTicket?._id?.toString?.(),
      orderId: ""
    });

    msg?.ack?.();
  }
};

export {
  OrderCancelledListener
};