import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";


jest.mock("../../natsWrapper");

describe("testing optimistic concurrency control", () => {
  it("test", async () => {

    const ticket = new global.DBModels.TICKET({
      title: "title",
      price: 20,
      userId: new mongoose.Types.ObjectId()
    });

    await ticket.save();
    console.log(ticket, "test");
  });
});