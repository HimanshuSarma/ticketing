import { Message } from "node-nats-streaming";
import { BasePublisher } from "./basePublisher";
import { TicketCreatedEvent } from "./ticketCreatedEvent";
import { Subjects } from "./subjects";

class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack();
  // }
};

export {
  TicketCreatedPublisher
};