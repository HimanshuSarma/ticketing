import { Message } from "node-nats-streaming";
import { BasePublisher } from "@himanshusarmaorg/common";
import { OrderCancelledEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  OrderCancelledPublisher
};