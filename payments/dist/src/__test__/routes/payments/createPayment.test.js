"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../app");
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("@himanshusarmaorg/common");
const razorpay_1 = require("../../../razorpay");
jest.mock("../../../natsWrapper");
// jest.mock("../../../razorpay");
describe("create payment test", () => {
    it("returns a 404 if the payment doesn't exist", async () => {
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/payments/`)
            .set("Authorization", token)
            .send({
            orderId: new mongoose_1.default.Types.ObjectId()
        })
            .expect(404);
    });
    it("returns an error if the order is doesn't belong to the user", async () => {
        // Create a sample order here...
        const sampleOrder = new global.DBModels.ORDER({
            status: common_1.OrderStatus.AwaitingPayment,
            userId: new mongoose_1.default.Types.ObjectId(),
            price: 200
        });
        await sampleOrder.save();
        console.log(sampleOrder, "sampleOrder");
        const token = global.signin();
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/payments/`)
            .set("Authorization", token)
            .send({
            orderId: sampleOrder?._id,
        })
            .expect(400);
    });
    it("returns an error if the order is cancelled", async () => {
        const userId = new mongoose_1.default.Types.ObjectId();
        // Create a sample order here...
        const sampleOrder = new global.DBModels.ORDER({
            status: common_1.OrderStatus.Cancelled,
            userId,
            price: 200
        });
        await sampleOrder.save();
        console.log(sampleOrder, "sampleOrder");
        const token1 = global.signin(userId?.toHexString());
        await (0, supertest_1.default)(app_1.app)
            .post(`/api/payments/`)
            .set("Authorization", token1)
            .send({
            orderId: sampleOrder?._id,
            token: "abcd"
        })
            .expect(400);
    });
    it("returns an 200 with valid inputs", async () => {
        const userId = new mongoose_1.default.Types.ObjectId();
        const randomPrice = 4521;
        // Create a sample order here...
        const sampleOrder = new global.DBModels.ORDER({
            status: common_1.OrderStatus.Created,
            userId,
            price: randomPrice
        });
        await sampleOrder.save();
        console.log(sampleOrder, "sampleOrder");
        const token1 = global.signin(userId?.toHexString());
        const res = await (0, supertest_1.default)(app_1.app)
            .post(`/api/payments/`)
            .set("Authorization", token1)
            .send({
            orderId: sampleOrder?._id,
        })
            .expect(200);
        expect(razorpay_1.razorpay.orders.create).toHaveBeenCalled();
        expect(res?.body?.paymentRes?.orderId)?.toBeDefined();
    });
});
