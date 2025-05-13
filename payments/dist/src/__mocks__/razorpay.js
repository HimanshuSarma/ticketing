"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
const razorpay = {
    orders: {
        create: jest
            .fn()
            .mockResolvedValue({})
    }
};
exports.razorpay = razorpay;
