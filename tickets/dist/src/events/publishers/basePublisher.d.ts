import { Stan } from "node-nats-streaming";
import { Event } from "@himanshusarmaorg/common";
declare abstract class BasePublisher<T extends Event> {
    abstract subject: T["subject"];
    private client;
    constructor(client: Stan);
    publish(data: T["data"]): Promise<void>;
}
export { BasePublisher };
