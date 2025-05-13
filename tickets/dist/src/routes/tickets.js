"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsRouter = void 0;
const express_1 = __importDefault(require("express"));
const createTicketController_1 = __importDefault(require("../controllers/ticketControllers/createTicketController"));
const fetchTicketController_1 = __importDefault(require("../controllers/ticketControllers/fetchTicketController"));
const fetchAllTicketsController_1 = __importDefault(require("../controllers/ticketControllers/fetchAllTicketsController"));
const common_1 = require("@himanshusarmaorg/common");
const upateTicketController_1 = __importDefault(require("../controllers/ticketControllers/upateTicketController"));
const router = express_1.default.Router();
exports.ticketsRouter = router;
router.post(`/`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), createTicketController_1.default.validation, createTicketController_1.default.handler);
router.put(`/:id`, (0, common_1.checkAuthenticationMiddleware)(process.env?.JWT_KEY || "abcd"), upateTicketController_1.default.validation, upateTicketController_1.default.handler);
router.get(`/:id/:userId`, fetchTicketController_1.default.validation, fetchTicketController_1.default.handler);
router.get(`/`, fetchAllTicketsController_1.default.validation, fetchAllTicketsController_1.default.handler);
