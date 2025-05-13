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
describe("create order test", () => {
    it("returns an error if the ticket doesn't exist", async () => {
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: new mongoose_1.default.Types.ObjectId()
        })
            .expect(404);
    });
    it("returns an error if the ticket is already reserved", async () => {
        // Create a sample ticket here...
        const sampleTicket = new global.DBModels.TICKET({
            title: "title",
            price: 200,
        });
        await sampleTicket.save();
        console.log(sampleTicket, "sampleTicket");
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: sampleTicket?._id,
        })
            .expect(200);
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: sampleTicket?._id,
        })
            .expect(400);
    });
    it("reserves a ticket", async () => {
        // Create a sample ticket here...
        const sampleTicket = new global.DBModels.TICKET({
            title: "title",
            price: 200
        });
        await sampleTicket.save();
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: sampleTicket?._id,
        })
            .expect(200);
    });
    it(`emits an order created event`, async () => {
        // Create a sample ticket here...
        const sampleTicket = new global.DBModels.TICKET({
            title: "title",
            price: 200
        });
        await sampleTicket.save();
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/orders/`)
            .set("Authorization", token)
            .send({
            ticketId: sampleTicket?._id,
        })
            .expect(200);
        expect(natsWrapper_1.natsWrapper.client.publish).toHaveBeenCalledTimes(1);
    });
});
