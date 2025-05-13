import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { app } from '../app';
import { IDBModels } from '../db/schemaTypes';
import TicketModel from '../models/TicketModel';

jest.mock("../natsWrapper");

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    instance: {
      dbName: "tickets"
    }
  });

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

  const dbModels: IDBModels = {
    TICKET: TicketModel
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

global.signin = () => {
  const payload = {
    _id: new mongoose.Types.ObjectId().toHexString(),
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

