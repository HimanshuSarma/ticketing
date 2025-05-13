"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const currentUserController = {
    validation: (async (req, res, next) => {
        if (req?.session?.jwt) {
            next();
        }
        else {
            throw new common_2.BadRequestError("No token found");
        }
    }),
    handler: (async (req, res, next) => {
        try {
            const userJwtPayload = jsonwebtoken_1.default.verify(req?.session?.jwt, process.env.JWT_KEY);
            res.status(200).json({
                currentUser: userJwtPayload
            });
        }
        catch (err) {
            const error = err;
            throw new common_1.GeneralError(error?.message);
        }
    })
};
exports.default = currentUserController;
