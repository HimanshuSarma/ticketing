"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const payments_1 = require("./payments");
const router = express_1.default.Router();
exports.paymentsIndexRouter = router;
router.use(`/api/payments`, payments_1.paymentsRouter);
