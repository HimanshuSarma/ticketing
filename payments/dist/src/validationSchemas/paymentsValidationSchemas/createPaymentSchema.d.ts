import { z } from "zod";
declare const createPaymentSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export default createPaymentSchema;
