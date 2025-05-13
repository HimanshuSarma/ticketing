"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupSchema_1 = __importDefault(require("../../validationSchemas/userValidationSchemas/signupSchema"));
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const common_3 = require("@himanshusarmaorg/common");
const userSigninController = {
    validation: (async (req, res, next) => {
        try {
            const parsedBody = signupSchema_1.default.parse(req.body);
            req.body = parsedBody;
            next();
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                // Send a 400 Bad Request with validation errors
                throw new common_1.RequestValidationError(err);
            }
            throw new common_2.GeneralError();
        }
    }),
    handler: (async (req, res, next) => {
        try {
            const user = await global.DBModels.USER.findOne({
                email: req?.body?.email
            });
            if (!user?._id) {
                throw new common_3.BadRequestError("User doesn't exist!");
            }
            if (user?.comparePassword(req?.body?.password)) {
                throw new common_3.BadRequestError("Password is incorrect!");
            }
            const userJwt = jsonwebtoken_1.default.sign({
                _id: user?._id,
                email: user?.email
            }, process.env.JWT_KEY);
            // if (req?.session) {
            //   req.session.jwt = userJwt;
            // }
            res.status(200).json({
                user,
                token: userJwt
            });
        }
        catch (err) {
            const error = err;
            throw new common_2.GeneralError(error?.message);
        }
    })
};
exports.default = userSigninController;
