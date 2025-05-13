import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../../natsWrapper";
import { OrderStatus } from "@himanshusarmaorg/common";
import { razorpay } from "../../../razorpay";

jest.mock("../../../natsWrapper");
// jest.mock("../../../razorpay");

describe("create payment test", () => {
  it("returns a 404 if the payment doesn't exist", async () => {
    const token = global.signin();

    await request(app)
      .post(
        `/api/payments/`
      )
      .set("Authorization", token)
      .send({
        orderId: new mongoose.Types.ObjectId()
      })
      .expect(404);
  });

  it("returns an error if the order is doesn't belong to the user", async () => {

    // Create a sample order here...
    const sampleOrder = new global.DBModels.ORDER({
      status: OrderStatus.AwaitingPayment,
      userId: new mongoose.Types.ObjectId(),
      price: 200
    });

    await sampleOrder.save();

    console.log(sampleOrder, "sampleOrder")

    const token = global.signin();
    await request(app)
      .post(
        `/api/payments/`
      )
      .set("Authorization", token)
      .send({
        orderId: sampleOrder?._id,
      })
      .expect(400);
  })

  it("returns an error if the order is cancelled", async () => {

    const userId = new mongoose.Types.ObjectId();

    // Create a sample order here...
    const sampleOrder = new global.DBModels.ORDER({
      status: OrderStatus.Cancelled,
      userId,
      price: 200
    });

    await sampleOrder.save();

    console.log(sampleOrder, "sampleOrder")

    const token1 = global.signin(userId?.toHexString());
    await request(app)
      .post(
        `/api/payments/`
      )
      .set("Authorization", token1)
      .send({
        orderId: sampleOrder?._id,
      })
      .expect(400);
  })


  it("returns an 200 with valid inputs", async () => {

    const userId = new mongoose.Types.ObjectId();
    const randomPrice = 4521;

    // Create a sample order here...
    const sampleOrder = new global.DBModels.ORDER({
      status: OrderStatus.Created,
      userId,
      price: randomPrice
    });

    await sampleOrder.save();

    console.log(sampleOrder, "sampleOrder")

    const token1 = global.signin(userId?.toHexString());
    const res = await request(app)
      .post(
        `/api/payments/`
      )
      .set("Authorization", token1)
      .send({
        orderId: sampleOrder?._id,
      })
      .expect(200);

    const fetchedRazorpayOrder = await razorpay.orders.fetch(
      res?.body?.paymentRes?.id
    );

    expect(res?.body?.paymentRes?.id)?.toBeDefined();
    expect(fetchedRazorpayOrder?.id).toBe(res?.body?.paymentRes?.id);
    expect(fetchedRazorpayOrder?.amount).toBe(res?.body?.paymentRes?.amount);
  })
});