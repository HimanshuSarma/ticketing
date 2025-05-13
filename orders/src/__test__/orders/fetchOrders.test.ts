import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";

jest.mock("../../natsWrapper");

describe("fetch orders test", () => {

  it("fetches orders for a particular user", async () => {

    // create 3 tickets...
    const t1 = await global.DBModels.TICKET.create({
      title: "title1",
      price: 100
    });

    const t2 = await global.DBModels.TICKET.create({
      title: "title2",
      price: 150
    });

    const t3 = await global.DBModels.TICKET.create({
      title: "title3",
      price: 80
    });

    // create 1 order as user #1...
    const token1 = global.signin("himanshu1@yopmail.com");
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token1)
      .send({
        ticketId: t1?._id
      })
      .expect(200);

    // create 2 orders as user #2...
    const token2 = global.signin("himanshu2@yopmail.com");
    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token2)
      .send({
        ticketId: t2?._id
      })
      .expect(200);

    await request(app)
      .post(
        `/api/orders/`
      )
      .set("Authorization", token2)
      .send({
        ticketId: t3?._id
      })
      .expect(200);

    // make request to get orders for user#2...
    const user2_Orders = await request(app)
      .get(
        `/api/orders/`
      )
      .set("Authorization", token2)
      .expect(200);
    
    expect(user2_Orders?.body?.length).toBe(2);
  });  
});