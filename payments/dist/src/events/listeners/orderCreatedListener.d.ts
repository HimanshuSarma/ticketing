import { BaseListener, OrderCreatedEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
declare class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated;
    queueGroupName: string;
    onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void>;
}
export { OrderCreatedListener };
