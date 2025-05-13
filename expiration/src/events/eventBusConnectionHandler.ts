import { natsWrapper } from "../natsWrapper";
import { OrderCreatedListener } from "./listeners/orderCreatedListener";
import { ExpirationCompletePublisher } from "./publishers/expirationCompletePublisher";


const eventBusConnectionHandler = async () => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID || "",
      process.env.NATS_CLIENT_ID || "",
      process.env.NATS_URL || ""
    );

    natsWrapper.client?.on("close", () => {
      console.log("Process terminated");
      process.exit();
    });

    process.on("SIGTERM", () => {
      natsWrapper.client?.close();
    });
    process.on("SIGINT", () => {
      natsWrapper.client?.close();
    });

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err: any) {
    console.error(err, "event bus connection error!");
  }
};

export default eventBusConnectionHandler;