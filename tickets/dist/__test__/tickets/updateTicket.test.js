"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
describe("update ticket test", () => {
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
    it("update ticket test", async () => {
        let fetchedTickets = await global.DBModels.TICKET.find({});
        expect(fetchedTickets.length).toEqual(0);
        const token = global.signin();
        const res = await (0, supertest_1.default)(app_1.app)
            .post(`/api/tickets/`)
            .set("Authorization", token)
            .send({
            title: "title",
            price: "200",
        })
            .expect(200);
        await (0, supertest_1.default)(app_1.app)
            .put(`/api/tickets/${res?.body?.id}/${res?.body?.userId}`)
            .set("Authorization", token)
            .send({
            title: "title-updated",
            price: "300",
        })
            .expect(200);
        const fetchedTicket = await (0, supertest_1.default)(app_1.app)
            .get(`/api/tickets/${res?.body?.id}/${res?.body?.userId}`)
            .expect(200);
        expect(fetchedTicket?.body?.title).toEqual("title-updated");
        expect(fetchedTicket?.body?.price).toEqual("300");
    });
});
