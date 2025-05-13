import { BasePublisher } from "@himanshusarmaorg/common";
import { TicketUpdatedEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";
declare class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated;
}
export { TicketUpdatedPublisher };
