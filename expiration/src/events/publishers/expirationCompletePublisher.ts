import { Message } from "node-nats-streaming";
import { BasePublisher } from "@himanshusarmaorg/common";
import { IExpirationCompleteEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class ExpirationCompletePublisher extends BasePublisher<IExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  ExpirationCompletePublisher
};