import { BaseListener, Subjects, TicketCreatedEvent } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
declare class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated;
    queueGroupName: string;
    onMessage(data: TicketCreatedEvent["data"], msg: Message): Promise<void>;
}
export { TicketCreatedListener };
