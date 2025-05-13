"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../natsWrapper");
describe("testing optimistic concurrency control", () => {
    it("test", async () => {
        const ticket = new global.DBModels.TICKET({
            title: "title",
            price: 20,
            userId: new mongoose_1.default.Types.ObjectId()
        });
        await ticket.save();
        console.log(ticket, "test");
    });
});
