import Queue from "bull";
import { IExpirationQueuePayload } from "../types/expirationQueuePayloadType";
import { ExpirationCompletePublisher } from "../events/publishers/expirationCompletePublisher";
import { natsWrapper } from "../natsWrapper";

const expirationQueue = new Queue<IExpirationQueuePayload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST || "172.18.255.205"
  }
});

  console.log(process.env.REDIS_HOST || "172.18.255.205", "host-config")

expirationQueue.on("", () => {
  console.log(`expirationQueue-connected`)
})

expirationQueue.process(async (job) => {
  console.log(`expirationQueueprocess`, job);
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job?.data?.orderId
  })
});

export {
  expirationQueue
};