import { BaseListener, QueueGroupName, Subjects, TicketCreatedEvent } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import mongoose from "mongoose";

class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message): Promise<void> {

    try {
      // @ts-ignore
      const parsedData = typeof data === "string" ? JSON.parse(data || "") : data;

      const newTicket = new global.DBModels.TICKET({
        ...parsedData,
        _id: new mongoose.Types.ObjectId(parsedData?.id),
        userId: new mongoose.Types.ObjectId(parsedData?.userId)
      });


      console.log("data", newTicket);

      await newTicket.save();
      console.log(newTicket, "newTicket")
      msg.ack();
    } catch (err) {
      console.log(`TicketCreatedListenerErr`, err);
    }
  }
};

export {
  TicketCreatedListener
};