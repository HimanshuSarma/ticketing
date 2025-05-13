import { z } from "zod";
declare const fetchOrderByIdSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export default fetchOrderByIdSchema;
