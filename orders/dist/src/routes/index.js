"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const orders_1 = require("./orders");
const router = express_1.default.Router();
exports.ordersIndexRouter = router;
router.use(`/api/orders`, orders_1.ordersRouter);
