import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { app } from '../app';
import { IDBModels } from '../db/schemaTypes';
import OrderModel from '../models/OrderModel';
import PaymentModel from "../models/PaymentModel";

jest.mock("../natsWrapper");

process.env.RAZORPAY_KEY_ID="rzp_test_J0yQiEWd9E2r3D";
process.env.RAZORPAY_KEY_SECRET="JsjvXPjdfjbd5109qlU70xxL";
process.env.RAZORPAY_WEBHOOK_SECRET_slash_order_slash_payment_captured="secret"
jest.unmock('razorpay');

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    instance: {
      dbName: "payments"
    }
  });

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

  const dbModels: IDBModels = {
    ORDER: OrderModel,
    PAYMENT: PaymentModel
  };

  global.DBModels = dbModels;
}, 20000);

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = (await mongoose?.connection?.db?.collections()) || [];

  for (let collection of collections) {
    await collection.deleteMany({});
  }
}, 10000);

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.disconnect();
}, 20000);

global.signin = (userId?: string) => {
  const payload = {
    id: userId ? 
      new mongoose.Types.ObjectId(userId).toHexString() :
      new mongoose.Types.ObjectId().toHexString(),
    email: "himanshu7@yopmail.com"
  };

  const token = jwt.sign(
    payload,
    process.env?.JWT_KEY || "abcd"
  );

  // const session = {
  //   jwt: token
  // };

  return token;
  // return [`express:sess=${Buffer.from(JSON.stringify(session)).toString("base64")}`];
}

