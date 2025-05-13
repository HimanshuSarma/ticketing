import { z } from "zod";

const createOrderSchema = z.object({
  ticketId: z.string(),
}).strict();

export default createOrderSchema;