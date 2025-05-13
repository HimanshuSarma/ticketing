import { z } from "zod";
declare const createOrderSchema: z.ZodObject<{
    ticketId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    ticketId: string;
}, {
    ticketId: string;
}>;
export default createOrderSchema;
