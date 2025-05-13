import { BaseListener, Subjects, TicketUpdatedEvent } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
declare class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated;
    queueGroupName: string;
    onMessage(data: TicketUpdatedEvent["data"], msg: Message): Promise<void>;
}
export { TicketUpdatedListener };
