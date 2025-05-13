"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
describe("user signout tests", () => {
    it("clears the cookie after signing out", async () => {
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signup`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
        const response = await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signout`)
            .send({})
            .expect(200);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});
