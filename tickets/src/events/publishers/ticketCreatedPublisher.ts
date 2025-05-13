import { Message } from "node-nats-streaming";
import { BasePublisher } from "@himanshusarmaorg/common";
import { TicketCreatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  TicketCreatedPublisher
};