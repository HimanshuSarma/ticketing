import { Message } from "node-nats-streaming";
import { BasePublisher } from "@himanshusarmaorg/common";
import { OrderCreatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  OrderCreatedPublisher
};