"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natsWrapper_1 = require("../natsWrapper");
const orderCancelledListener_1 = require("./listeners/orderCancelledListener");
const orderCreatedListener_1 = require("./listeners/orderCreatedListener");
const eventBusConnectionHandler = async () => {
    try {
        await natsWrapper_1.natsWrapper.connect(process.env.NATS_CLUSTER_ID || "", process.env.NATS_CLIENT_ID || "", process.env.NATS_URL || "");
        natsWrapper_1.natsWrapper.client?.on("close", () => {
            console.log("Process terminated");
            process.exit();
        });
        process.on("SIGTERM", () => {
            natsWrapper_1.natsWrapper.client?.close();
        });
        process.on("SIGINT", () => {
            natsWrapper_1.natsWrapper.client?.close();
        });
        new orderCreatedListener_1.OrderCreatedListener(natsWrapper_1.natsWrapper.client).listen();
        new orderCancelledListener_1.OrderCancelledListener(natsWrapper_1.natsWrapper.client).listen();
    }
    catch (err) {
        console.error(err, "event bus connection error!");
    }
};
exports.default = eventBusConnectionHandler;
