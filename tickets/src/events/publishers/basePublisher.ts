import { Stan } from "node-nats-streaming";
import { Event } from "@himanshusarmaorg/common";

abstract class BasePublisher<T extends Event> {
  abstract subject: T["subject"];
  private client: Stan;
  
  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Event published`);
          resolve();
        }
      });  
    });
  }
};

export {
  BasePublisher
};