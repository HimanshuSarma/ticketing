"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expirationQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const expirationCompletePublisher_1 = require("../events/publishers/expirationCompletePublisher");
const natsWrapper_1 = require("../natsWrapper");
const expirationQueue = new bull_1.default("order:expiration", {
    redis: {
        host: process.env.REDIS_HOST || "172.18.255.205"
    }
});
exports.expirationQueue = expirationQueue;
console.log(process.env.REDIS_HOST || "172.18.255.205", "host-config");
expirationQueue.on("", () => {
    console.log(`expirationQueue-connected`);
});
expirationQueue.process(async (job) => {
    console.log(`expirationQueueprocess`, job);
    new expirationCompletePublisher_1.ExpirationCompletePublisher(natsWrapper_1.natsWrapper.client).publish({
        orderId: job?.data?.orderId
    });
});
