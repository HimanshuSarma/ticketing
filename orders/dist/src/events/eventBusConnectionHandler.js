"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natsWrapper_1 = require("../natsWrapper");
const expirationCompleteListener_1 = require("./listeners/expirationCompleteListener");
const ticketCreatedListener_1 = require("./listeners/ticketCreatedListener");
const ticketUpdatedListener_1 = require("./listeners/ticketUpdatedListener");
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
        new ticketCreatedListener_1.TicketCreatedListener(natsWrapper_1.natsWrapper.client).listen();
        new ticketUpdatedListener_1.TicketUpdatedListener(natsWrapper_1.natsWrapper.client).listen();
        new expirationCompleteListener_1.ExpirationCompleteListener(natsWrapper_1.natsWrapper.client).listen();
    }
    catch (err) {
        console.error(err, "event bus connection error!");
    }
};
exports.default = eventBusConnectionHandler;
