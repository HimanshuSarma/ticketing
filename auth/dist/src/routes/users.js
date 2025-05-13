"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const signupController_1 = __importDefault(require("../controllers/userControllers/signupController"));
const signinController_1 = __importDefault(require("../controllers/userControllers/signinController"));
const currentUserController_1 = __importDefault(require("../controllers/userControllers/currentUserController"));
const signoutController_1 = __importDefault(require("../controllers/userControllers/signoutController"));
const router = express_1.default.Router();
exports.userRouter = router;
router.post(`/signup`, signupController_1.default.validation, signupController_1.default.handler);
router.post(`/signin`, signinController_1.default.validation, signinController_1.default.handler);
router.post(`/signout`, signoutController_1.default.validation, signoutController_1.default.handler);
router.get(`/currentuser`, currentUserController_1.default.validation, currentUserController_1.default.handler);
