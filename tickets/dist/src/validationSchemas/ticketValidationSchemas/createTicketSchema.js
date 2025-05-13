"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createTicketSchema = zod_1.z.object({
    title: zod_1.z.string(),
    price: zod_1.z.number(),
    userId: zod_1.z.string()
}).strict();
exports.default = createTicketSchema;
