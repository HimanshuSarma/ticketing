import { BaseListener, NotFoundError, QueueGroupName, Subjects, TicketUpdatedEvent } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose from "mongoose";

class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message): Promise<void> {

    // @ts-ignore
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;

    console.log(parsedData,'parsedData');

    const fetchedTicket = await global.DBModels.TICKET?.findByEvent({
      id: parsedData?.id,
      version: parsedData?.version
    });

    if (!fetchedTicket?._id) {
      throw new NotFoundError(`The requested ticket was not found!`);
    }

    fetchedTicket.set({
      title: parsedData?.title || fetchedTicket?.title,
      price: parsedData?.price || fetchedTicket?.price
    });

    await fetchedTicket?.save();

    msg?.ack();
  }
};

export {
  TicketUpdatedListener
};