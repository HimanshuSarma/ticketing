"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
jest.mock("../natsWrapper");
process.env.RAZORPAY_KEY_ID = "rzp_test_J0yQiEWd9E2r3D";
process.env.RAZORPAY_KEY_SECRET = "JsjvXPjdfjbd5109qlU70xxL";
let mongo;
beforeAll(async () => {
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create({
        instance: {
            dbName: "payments"
        }
    });
    const mongoUri = mongo.getUri();
    await mongoose_1.default.connect(mongoUri);
    const dbModels = {
        ORDER: OrderModel_1.default
    };
    global.DBModels = dbModels;
}, 20000);
beforeEach(async () => {
    jest.clearAllMocks();
    const collections = (await mongoose_1.default?.connection?.db?.collections()) || [];
    for (let collection of collections) {
        await collection.deleteMany({});
    }
}, 10000);
afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose_1.default.disconnect();
}, 20000);
global.signin = (userId) => {
    const payload = {
        id: userId ?
            new mongoose_1.default.Types.ObjectId(userId).toHexString() :
            new mongoose_1.default.Types.ObjectId().toHexString(),
        email: "himanshu7@yopmail.com"
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env?.JWT_KEY || "abcd");
    // const session = {
    //   jwt: token
    // };
    return token;
    // return [`express:sess=${Buffer.from(JSON.stringify(session)).toString("base64")}`];
};
