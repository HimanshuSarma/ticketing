"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fetchTicketSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string()
});
exports.default = fetchTicketSchema;
