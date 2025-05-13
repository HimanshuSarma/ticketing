"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
jest.mock("../../natsWrapper");
describe("fetch order by id test", () => {
    it("fetches an order by id for a particular user", async () => {
        // Create a sample ticket here...
        const sampleTicket = await global.DBModels.TICKET.create({
            title: "title",
            price: 200
        });
        const token = global.signin();
        const newOrder = await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: sampleTicket?._id,
        })
            .expect(200);
        const token2 = global.signin("h2@yopmail.com");
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/api/orders/?orderId=${newOrder?.body?._id}`)
            .set("Authorization", token2)
            .expect(200);
        expect(res?.body?.length).toBe(0);
    });
});
