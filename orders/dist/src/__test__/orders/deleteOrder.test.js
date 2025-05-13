"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const natsWrapper_1 = require("../../natsWrapper");
const common_1 = require("@himanshusarmaorg/common");
jest.mock("../../natsWrapper");
describe("cancel order by id test", () => {
    it("cancels an order by id for a particular user", async () => {
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
        console.log(newOrder?.body?.id, sampleTicket, "newOrder");
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/api/orders/?orderId=${newOrder?.body?.id}`)
            .set("Authorization", token)
            .expect(200);
        expect(res?.body?.status).toEqual(common_1.OrderStatus.Cancelled);
    });
    it(`emits an order cancelled event`, async () => {
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
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/api/orders/?orderId=${newOrder?.body?.id}`)
            .set("Authorization", token)
            .expect(200);
        expect(natsWrapper_1.natsWrapper.client.publish).toHaveBeenCalledTimes(2);
    });
});
