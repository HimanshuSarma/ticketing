import { BaseListener, NotFoundError, OrderCreatedEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose, { HydratedDocument } from "mongoose";
import { TicketUpdatedPublisher } from "../publishers/ticketUpdatedPublisher";
import { ITicketSchema } from "../../models/TicketModel";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
    try {
      // @ts-ignore
      const parsedData = JSON.parse(data);  
      const fetchedTicket = await global.DBModels.TICKET.findOne({
        _id: new mongoose.Types.ObjectId(parsedData?.ticket?.id?.toString())
      });

      if (!fetchedTicket?._id) {
        throw new NotFoundError(`No ticket was found`)
      }

      fetchedTicket?.set({
        orderId: parsedData?.id,
      });

      await fetchedTicket?.save();

      await new TicketUpdatedPublisher(this.client).publish({
        id: fetchedTicket?._id?.toString?.(),
        title: fetchedTicket?.title,
        price: fetchedTicket?.price,
        version: fetchedTicket?.version,
        orderId: fetchedTicket?.orderId?.toString?.()
      });

      msg?.ack?.();

      console.log(`OrderCreatedListener-ticket-srv`, fetchedTicket);
    } catch (err) {
      console.log(err, "OrderCreatedListenerErr")
    }
  }
};

export {
  OrderCreatedListener
};