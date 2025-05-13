import { BasePublisher } from "@himanshusarmaorg/common";
import { TicketCreatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";
declare class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated;
}
export { TicketCreatedPublisher };
