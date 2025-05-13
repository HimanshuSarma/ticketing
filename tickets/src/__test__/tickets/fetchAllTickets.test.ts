import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";

jest.mock("../../natsWrapper");

describe("fetch all tickets test", () => {
  it("fetch all tickets", async () => {
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

    const fetchedTicket = await request(app)
      .get(
        `/api/tickets/`
      )
      .expect(200);

    expect(fetchedTicket?.body?.length).toBeGreaterThan(0);
  });
});