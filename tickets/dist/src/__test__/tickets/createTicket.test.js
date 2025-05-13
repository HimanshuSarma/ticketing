"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const mongoose_1 = __importDefault(require("mongoose"));
const natsWrapper_1 = require("../../natsWrapper");
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
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/tickets/`)
            .set("Authorization", token)
            .send()
            .expect(400);
    });
    it("returns a 200 status if data is valid", async () => {
        let fetchedTickets = await global.DBModels.TICKET.find({});
        expect(fetchedTickets.length).toEqual(0);
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/tickets/`)
            .set("Authorization", token)
            .send({
            title: "title",
            price: 200,
            userId: new mongoose_1.default.Types.ObjectId()
        })
            .expect(200);
        fetchedTickets = await global.DBModels.TICKET.find({});
        expect(fetchedTickets.length).toEqual(1);
        expect(natsWrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
    });
});
