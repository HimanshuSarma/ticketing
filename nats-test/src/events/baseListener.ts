import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { QueueGroupName } from "./queueGroupNames";
import { Event } from "./event";

abstract class BaseListener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: T["queueGroupName"];
  abstract onMessage(data: T["data"], msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  };

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    ); 

    subscription.on("message", (message: Message) => {
      console.log(`Message received: ${message.getData()}, ${this.subject} / ${this.queueGroupName}`);
      const parsedMessage = this.parseMessage(message);
      this.onMessage(message.getData(), message);
    });
  };

  parseMessage(message: Message) {
    const data = message?.getData();

    return typeof data === "string" ?
      JSON.parse(data) :
      JSON.parse(data.toString("utf-8")) 
  };
};

export {
  BaseListener
};