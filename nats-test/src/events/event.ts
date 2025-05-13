import { QueueGroupName } from "./queueGroupNames";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects,
  queueGroupName: QueueGroupName,
  data: any
};

export {
  Event
};