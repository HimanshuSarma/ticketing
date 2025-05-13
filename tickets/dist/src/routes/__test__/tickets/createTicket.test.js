"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
describe("create ticket test", () => {
    it("returns a 200 on successful ticket creation", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post(`/api/tickets/`)
            .send({
            name: "123"
        })
            .expect(400);
        console.log(res, "createTicket");
    });
});
