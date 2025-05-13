import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import { IDBModels } from '../db/schemaTypes';
import UserModel from '../models/UserModel';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = await MongoMemoryServer.create({
    instance: {
      dbName: "auth"
    }
  });

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

  const dbModels: IDBModels = {
    USER: UserModel
  };

  global.DBModels = dbModels;
}, 20000);

beforeEach(async () => {
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

global.signin = async () => {

  const email = "test@gmail.com";
  const password = "Password123.";

  const response = await request(app)
    .post(`/api/users/signup`)
    .send({
      email,
      password
    })
    .expect(200);

  return response.get("Set-Cookie")?.[0] || "";
}

