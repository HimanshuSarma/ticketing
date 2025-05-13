import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";

jest.mock("../../natsWrapper");

describe("create order test", () => {
  it("returns an error if the ticket doesn't exist", async () => {
    const token = global.signin();
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: new mongoose.Types.ObjectId()
      })
      .expect(404);
  });

  it("returns an error if the ticket is already reserved", async () => {

    // Create a sample ticket here...
    const sampleTicket = new global.DBModels.TICKET({
      title: "title",
      price: 200,
    });

    await sampleTicket.save();


    console.log(sampleTicket, "sampleTicket")

    const token = global.signin();
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: sampleTicket?._id,
      })
      .expect(200);

    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: sampleTicket?._id,
      })
      .expect(400);
  });

  it("reserves a ticket", async () => {
    // Create a sample ticket here...
    const sampleTicket = new global.DBModels.TICKET({
      title: "title",
      price: 200
    });

    await sampleTicket.save();

    const token = global.signin();
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: sampleTicket?._id,
      })
      .expect(200);
  });
  
  it(`emits an order created event`, async () => {
    // Create a sample ticket here...
    const sampleTicket = new global.DBModels.TICKET({
      title: "title",
      price: 200
    });

    await sampleTicket.save();

    const token = global.signin();
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: sampleTicket?._id,
      })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });
});