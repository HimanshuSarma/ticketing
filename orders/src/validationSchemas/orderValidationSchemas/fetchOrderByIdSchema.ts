import { z } from "zod";

const fetchOrderByIdSchema = z.object({
  orderId: z.string(),
}).strict();

export default fetchOrderByIdSchema;