import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";
import { OrderStatus } from "@himanshusarmaorg/common";

jest.mock("../../natsWrapper");

describe("cancel order by id test", () => {

  it("cancels an order by id for a particular user", async () => {
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

    console.log(newOrder?.body?.id, sampleTicket, "newOrder")

    const res = await request(app)
      .patch(
        `/api/orders/?orderId=${newOrder?.body?.id}`
      )
      .set("Authorization", token)
      .expect(200);

    expect(res?.body?.status).toEqual(OrderStatus.Cancelled);
  });  

  it(`emits an order cancelled event`, async () => {
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

    const res = await request(app)
      .patch(
        `/api/orders/?orderId=${newOrder?.body?.id}`
      )
      .set("Authorization", token)
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
  });
});