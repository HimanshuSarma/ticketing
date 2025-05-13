import { z } from "zod";

const deleteOrderSchema = z.object({
  orderId: z.string(),
}).strict();

export default deleteOrderSchema;