import Razorpay from "razorpay";

console.log(Razorpay, "Razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_J0yQiEWd9E2r3D",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "JsjvXPjdfjbd5109qlU70xxL"
});

export {
  razorpay
};