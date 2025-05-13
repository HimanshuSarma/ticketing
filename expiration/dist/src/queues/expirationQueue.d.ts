import Queue from "bull";
import { IExpirationQueuePayload } from "../types/expirationQueuePayloadType";
declare const expirationQueue: Queue.Queue<IExpirationQueuePayload>;
export { expirationQueue };
