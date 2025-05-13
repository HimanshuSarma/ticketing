import { Message } from "node-nats-streaming";
import { BaseListener } from "./baseListener";
import { TicketCreatedEvent } from "./ticketCreatedEvent";
import { Subjects } from "./subjects";
import { QueueGroupName } from "./queueGroupNames";

class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: QueueGroupName.PaymentsService = QueueGroupName.PaymentsService;

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(`Event data: ${data}`);
    msg.ack();
  }
};

export {
  TicketCreatedListener
};