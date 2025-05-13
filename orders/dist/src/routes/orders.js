"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("@himanshusarmaorg/common");
const createOrderController_1 = __importDefault(require("../controllers/orderControllers/createOrderController"));
const fetchOrdersController_1 = __importDefault(require("../controllers/orderControllers/fetchOrdersController"));
const deleteOrderController_1 = __importDefault(require("../controllers/orderControllers/deleteOrderController"));
const router = express_1.default.Router();
exports.ordersRouter = router;
router.post(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), createOrderController_1.default.validation, createOrderController_1.default.handler);
router.patch(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), deleteOrderController_1.default.validation, deleteOrderController_1.default.handler);
// router.get<
//   ITicketFetchRequestParams
// >(  
//   `/:id/:userId`,
//   fetchTicketController.validation,
//   fetchTicketController.handler
// );
router.get(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), fetchOrdersController_1.default.validation, fetchOrdersController_1.default.handler);
router.get(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), fetchOrdersController_1.default.validation, fetchOrdersController_1.default.handler);
