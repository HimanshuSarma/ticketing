import { z } from "zod";
declare const updateTicketSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    orderId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    price?: number | undefined;
    orderId?: string | undefined;
}, {
    title?: string | undefined;
    price?: number | undefined;
    orderId?: string | undefined;
}>;
declare const updateTicketParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strict", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export default updateTicketSchema;
export { updateTicketParamsSchema };
