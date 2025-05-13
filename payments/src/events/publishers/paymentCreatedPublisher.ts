import { BasePublisher } from "@himanshusarmaorg/common";
import { IPaymentCreatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";

class PaymentCreatedPublisher extends BasePublisher<IPaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  // onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
  //   console.log(`Event data: ${data}`);
  //   msg.ack()
  // }
};

export {
  PaymentCreatedPublisher
};