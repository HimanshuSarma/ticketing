import { z } from "zod";

const createPaymentSchema = z.object({
  orderId: z.string()
}).strict();

export default createPaymentSchema;