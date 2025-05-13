import { natsWrapper } from "../natsWrapper";
import { ExpirationCompleteListener } from "./listeners/expirationCompleteListener";
import { PaymentCreatedListener } from "./listeners/paymentCreatedListener";
import { TicketCreatedListener } from "./listeners/ticketCreatedListener";
import { TicketUpdatedListener } from "./listeners/ticketUpdatedListener";


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

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
  } catch (err: any) {
    console.error(err, "event bus connection error!");
  }
};

export default eventBusConnectionHandler;