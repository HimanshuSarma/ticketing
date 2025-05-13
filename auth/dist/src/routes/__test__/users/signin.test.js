"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
describe("user signin tests", () => {
    it("returns a 200 on successful signin", async () => {
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signup`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
        return (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signin`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
    });
    it("returns a 400 on failed signin due to non existing email", async () => {
        return (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signin`)
            .send({
            email: "test@test1.com",
            password: "Password123."
        })
            .expect(500);
    });
    it("returns an error on failed signin due to invalid password", async () => {
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signup`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
        return (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signin`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
    });
    it("expects a Set-Cookie header in the response", async () => {
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signup`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
        const response = await (0, supertest_1.default)(app_1.app)
            .post(`/api/users/signin`)
            .send({
            email: "test@gmail.com",
            password: "Password123."
        })
            .expect(200);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});
