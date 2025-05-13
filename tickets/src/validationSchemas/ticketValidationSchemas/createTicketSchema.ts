import { z } from "zod";

const createTicketSchema = z.object({
  title: z.string(),
  price: z.number(),
  userId: z.string()
}).strict();

export default createTicketSchema;