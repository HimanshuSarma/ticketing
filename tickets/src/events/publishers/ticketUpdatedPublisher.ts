import { Message } from "node-nats-streaming";
import { BasePublisher } from "@himanshusarmaorg/common";
import { TicketUpdatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  TicketUpdatedPublisher
};