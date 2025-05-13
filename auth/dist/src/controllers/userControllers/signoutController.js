"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
const userSignoutController = {
    validation: (async (req, res, next) => {
        try {
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
            req.session = null;
            res.status(200).json({});
        }
        catch (err) {
            const error = err;
            throw new common_2.GeneralError(error?.message);
        }
    })
};
exports.default = userSignoutController;
