import { QueueGroupName } from "./queueGroupNames";
import { Subjects } from "./subjects";

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated,
  queueGroupName: QueueGroupName.PaymentsService,
  data: {
    id: string,
    title: string,
    price: number
  }
};

export type {
  TicketCreatedEvent
}