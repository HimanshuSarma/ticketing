import { BasePublisher } from "@himanshusarmaorg/common";
import { OrderCancelledEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";
declare class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled;
}
export { OrderCancelledPublisher };
