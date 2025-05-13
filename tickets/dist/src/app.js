"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Import cookie-parser
require("express-async-errors");
const routes_1 = require("./routes");
const common_1 = require("@himanshusarmaorg/common");
// import createConnectionHandler from "./db/connectionHandler";
const app = (0, express_1.default)();
exports.app = app;
// Define allowed origins
const allowedOrigins = [
    "http://localhost:3000", "http://127.0.0.1:3000",
    "http://localhost:4000", "http://127.0.0.1:4000",
    "http://localhost:5173", "http://127.0.0.1:5173",
    "http://abc.com",
    "http://himanshu123abc.com"
];
// Define allowed methods
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
// Define allowed headers
const allowedHeaders = ["Content-Type", "Authorization", "Accept", "X-Requested-With"];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Check if the origin is in the allowed list
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        // **Crucially, set Access-Control-Allow-Credentials to true**
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    // Set allowed methods
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
    // Set allowed headers
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.sendStatus(204); // Respond with No Content
    }
    else {
        next();
    }
});
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
    httpOnly: false,
    sameSite: false,
    // domain: process.env.NODE_ENV === 'production' ? '.ticketing.dev' : "localhost",
    path: '/'
    // secure: process.env.NODE_ENV !== "test"
}));
app.use(routes_1.ticketsIndexRouter);
app.use((err, req, res, next) => {
    (0, common_1.errorHandler)(err, req, res, next);
});
