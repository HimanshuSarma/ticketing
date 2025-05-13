import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";

jest.mock("../../natsWrapper");

describe("fetch order by id test", () => {

  it("fetches an order by id for a particular user", async () => {
    // Create a sample ticket here...
    const sampleTicket = await global.DBModels.TICKET.create({
      title: "title",
      price: 200
    });

    const token = global.signin();
    const newOrder = await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token)
      .send({
        ticketId: sampleTicket?._id,
      })
      .expect(200);

    const token2 = global.signin("h2@yopmail.com");
    const res = await request(app)
      .get(
        `/api/orders/?orderId=${newOrder?.body?._id}`
      )
      .set("Authorization", token2)
      .expect(200);

    expect(res?.body?.length).toBe(0);
  });  
});