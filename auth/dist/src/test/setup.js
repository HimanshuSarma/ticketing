"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const UserModel_1 = __importDefault(require("../models/UserModel"));
let mongo;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create({
        instance: {
            dbName: "auth"
        }
    });
    const mongoUri = mongo.getUri();
    await mongoose_1.default.connect(mongoUri);
    const dbModels = {
        USER: UserModel_1.default
    };
    global.DBModels = dbModels;
}, 20000);
beforeEach(async () => {
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
global.signin = async () => {
    const email = "test@gmail.com";
    const password = "Password123.";
    const response = await (0, supertest_1.default)(app_1.app)
        .post(`/api/users/signup`)
        .send({
        email,
        password
    })
        .expect(200);
    return response.get("Set-Cookie")?.[0] || "";
};
