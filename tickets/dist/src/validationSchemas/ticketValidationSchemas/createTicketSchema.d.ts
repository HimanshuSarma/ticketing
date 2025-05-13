import { z } from "zod";
declare const createTicketSchema: z.ZodObject<{
    title: z.ZodString;
    price: z.ZodNumber;
    userId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    title: string;
    price: number;
    userId: string;
}, {
    title: string;
    price: number;
    userId: string;
}>;
export default createTicketSchema;
