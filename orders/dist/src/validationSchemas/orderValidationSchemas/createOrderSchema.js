"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    ticketId: zod_1.z.string(),
}).strict();
exports.default = createOrderSchema;
