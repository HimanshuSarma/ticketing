import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

jest.mock("../../natsWrapper");

describe("fetch ticket test", () => {
  it("fetch a ticket with a ticket id", async () => {
    let fetchedTickets = await global.DBModels.TICKET.find({});

    expect(fetchedTickets.length).toEqual(0);

    const token = global.signin();
    const res = await request(app)
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

    const fetchedTicket = await request(app)
      .get(
        `/api/tickets/${res?.body?.id}/${res?.body?.userId}`
      )
      .expect(200);

    expect(fetchedTicket?.body?.id).toBeDefined();
  });
});