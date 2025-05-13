import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticketCreatedPublisher";

const client = nats.connect(
  `ticketing`,
  'abc',
  {
    url: `http://172.18.255.202:4222`
  }
);

client.on("connect", () => {
  console.log(`Publisher connected to NATS`);

  const publisher = new TicketCreatedPublisher(client);
  try {
    publisher.publish(
      {
        id: "123",
        title: "title",
        price: 20
      }
    );
  } catch (err) {
    console.error(err);
  }

});