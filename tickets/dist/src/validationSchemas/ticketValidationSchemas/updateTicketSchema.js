"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketParamsSchema = void 0;
const zod_1 = require("zod");
const updateTicketSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    orderId: zod_1.z.string().optional()
}).strict();
const updateTicketParamsSchema = zod_1.z.object({
    id: zod_1.z.string()
}).strict();
exports.updateTicketParamsSchema = updateTicketParamsSchema;
exports.default = updateTicketSchema;
