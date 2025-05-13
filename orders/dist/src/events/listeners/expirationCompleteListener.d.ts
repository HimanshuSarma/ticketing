import { BaseListener, Subjects, IExpirationCompleteEvent } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
declare class ExpirationCompleteListener extends BaseListener<IExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete;
    queueGroupName: string;
    onMessage(data: IExpirationCompleteEvent["data"], msg: Message): Promise<void>;
}
export { ExpirationCompleteListener };
