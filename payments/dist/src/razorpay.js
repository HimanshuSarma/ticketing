"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
console.log(razorpay_1.default, "Razorpay");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_J0yQiEWd9E2r3D",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "JsjvXPjdfjbd5109qlU70xxL"
});
exports.razorpay = razorpay;
