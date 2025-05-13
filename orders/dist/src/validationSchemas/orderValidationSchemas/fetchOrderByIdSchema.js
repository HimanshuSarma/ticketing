"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fetchOrderByIdSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
}).strict();
exports.default = fetchOrderByIdSchema;
