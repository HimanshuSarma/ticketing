import { BaseListener, OrderCancelledEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
declare class OrderCancelledListener extends BaseListener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled;
    queueGroupName: string;
    onMessage(data: OrderCancelledEvent["data"], msg: Message): Promise<void>;
}
export { OrderCancelledListener };
