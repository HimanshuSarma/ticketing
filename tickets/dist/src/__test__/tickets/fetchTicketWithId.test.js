"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../natsWrapper");
describe("fetch ticket test", () => {
    it("fetch a ticket with a ticket id", async () => {
        let fetchedTickets = await global.DBModels.TICKET.find({});
        expect(fetchedTickets.length).toEqual(0);
        const token = global.signin();
        const res = await (0, supertest_1.default)(app_1.app)
            .post(`/api/tickets/`)
            .set("Authorization", token)
            .send({
            title: "title",
            price: 200,
            userId: new mongoose_1.default.Types.ObjectId()
        })
            .expect(200);
        const fetchedTicket = await (0, supertest_1.default)(app_1.app)
            .get(`/api/tickets/${res?.body?.id}/${res?.body?.userId}`)
            .expect(200);
        expect(fetchedTicket?.body?.id).toBeDefined();
    });
});
