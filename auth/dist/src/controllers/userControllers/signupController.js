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
const userSignupController = {
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
            const doesUserExist = await global.DBModels.USER.findOne({
                email: req?.body?.email
            });
            if (doesUserExist?._id) {
                throw new common_3.BadRequestError("User already exists!");
            }
            console.log("JWT_KEY", process.env.JWT_KEY);
            const newUser = await global.DBModels.USER.create(req?.body);
            const userJwt = jsonwebtoken_1.default.sign({
                _id: newUser?._id,
                email: newUser?.email
            }, process.env.JWT_KEY);
            // if (req?.session) {
            //   req.session.jwt = userJwt;
            // }
            res.status(200).json({
                user: newUser,
                token: userJwt
            });
        }
        catch (err) {
            console.log(err, "userSignupControllerHandler");
            const error = err;
            throw new common_2.GeneralError(error?.message);
        }
    })
};
exports.default = userSignupController;
