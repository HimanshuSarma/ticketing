"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsIndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const tickets_1 = require("./tickets");
const router = express_1.default.Router();
exports.ticketsIndexRouter = router;
router.use(`/api/tickets`, tickets_1.ticketsRouter);
