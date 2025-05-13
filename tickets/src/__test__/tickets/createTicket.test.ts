import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";

jest.mock("../../natsWrapper");

describe("create ticket test", () => {
  // it("returns a 200 on successful ticket creation", async () => {
  //   await request(app)
  //     .post(
  //       `/api/tickets/`
  //     )
  //     .send({
  //       name: "123"
  //     })
  //     .expect(401);
  // });

  // it("returns a status other than 401 if the user is signed in", async () => {
  //   const token = global.signin();
  //   await request(app)
  //     .post(
  //       `/api/tickets/`
  //     )
  //     .set("Authorization", token)
  //     .send({})
  //     .expect(400);
  // });

  it("returns a 400 status if data is invalid", async () => {
    const token = global.signin();
    await request(app)
      .post(
        `/api/tickets/`
      )
      .set("Authorization", token)
      .send()
      .expect(400);
  });

  it("returns a 200 status if data is valid", async () => {

    let fetchedTickets = await global.DBModels.TICKET.find({});

    expect(fetchedTickets.length).toEqual(0);

    const token = global.signin();
    await request(app)
      .post(
        `/api/tickets/`
      )
      .set("Authorization", token)
      .send({
        title: "title",
        price: 200,
        userId: new mongoose.Types.ObjectId()
      })
      .expect(200);
    
    fetchedTickets = await global.DBModels.TICKET.find({});
    expect(fetchedTickets.length).toEqual(1);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});