"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const createPaymentController_1 = __importDefault(require("../controllers/paymentControllers/createPaymentController"));
const common_1 = require("@himanshusarmaorg/common");
const router = express_1.default.Router();
exports.paymentsRouter = router;
router.post(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), createPaymentController_1.default.validation, createPaymentController_1.default.handler);
