import { z } from "zod";
declare const fetchTicketSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    id: string;
}, {
    userId: string;
    id: string;
}>;
export default fetchTicketSchema;
