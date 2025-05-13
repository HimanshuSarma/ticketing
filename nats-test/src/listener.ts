import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticketCreatedListener";

const listener = nats.connect(
  `ticketing`,
  '123',
  {
    url: `http://172.18.255.202:4222`
  }
);

listener.on("connect", () => {
  console.log(`Listener connected to NATS`);


  listener.on("close", () => {
    console.log("Process terminated");
    process.exit();
  });

  new TicketCreatedListener(listener).listen();
});


process.on("SIGTERM", () => {
  listener.close();
});
process.on("SIGINT", () => {
  listener.close();
});