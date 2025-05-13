import { z } from "zod";
declare const deleteOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export default deleteOrderSchema;
