"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const connectionHandler_1 = __importDefault(require("./db/connectionHandler"));
const app_1 = require("./app");
const eventBusConnectionHandler_1 = __importDefault(require("./events/eventBusConnectionHandler"));
const port = 3000;
const connectDBHandler = async () => {
    try {
        // await eventBusConnectionHandler();
        await (0, connectionHandler_1.default)();
        // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
    }
    catch (err) {
        console.log("DB connection error: ", err);
    }
};
const eventBusListenersHandler = async () => {
    try {
        await (0, eventBusConnectionHandler_1.default)();
        // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
    }
    catch (err) {
        console.log("event bus Listener error: ", err);
    }
};
app_1.app.listen(port, async () => {
    console.log(`Server listening at port: ${port}`);
    await connectDBHandler();
    await eventBusListenersHandler();
});
