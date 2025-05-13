"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
describe("currentUser tests", () => {
    it("expects 200 response from currentuser", async () => {
        const authCookie = await global.signin();
        console.log(authCookie, "authCookie");
        const currentUserResponse = await (0, supertest_1.default)(app_1.app)
            .get(`/api/users/currentuser`)
            .set("Cookie", authCookie)
            .send()
            .expect(200);
        expect(currentUserResponse.body?.currentUser?.email).toBe("test@gmail.com");
    });
    it("returns null if user is not authenticated", async () => {
        const currentUserResponse = await (0, supertest_1.default)(app_1.app)
            .get(`/api/users/currentuser`)
            .set("Cookie", "invalidcookie")
            .send()
            .expect(400);
        expect(currentUserResponse.body).toEqual({
            errors: [{
                    message: "No token found"
                }]
        });
    });
});
