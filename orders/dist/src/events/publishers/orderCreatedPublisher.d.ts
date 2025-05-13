import { BasePublisher } from "@himanshusarmaorg/common";
import { OrderCreatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";
declare class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated;
}
export { OrderCreatedPublisher };
