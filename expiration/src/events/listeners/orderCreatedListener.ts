import { BaseListener, NotFoundError, OrderCreatedEvent, Subjects } from "@himanshusarmaorg/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { expirationQueue } from "../../queues/expirationQueue";

class OrderCreatedListener extends BaseListener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
    // @ts-ignore
    const parsedData = JSON.parse(data);

    console.log(data, data?.id, parsedData, "OrderCreatedListener-expiration")

    await expirationQueue.add({
      orderId: parsedData?.id
    });

    msg.ack();
  }
};

export {
  OrderCreatedListener
};