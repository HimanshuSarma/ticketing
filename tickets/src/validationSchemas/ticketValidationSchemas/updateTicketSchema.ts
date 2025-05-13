import { z } from "zod";

const updateTicketSchema = z.object({
  title: z.string().optional(),
  price: z.number().optional(),
  orderId: z.string().optional()
}).strict();

const updateTicketParamsSchema = z.object({
  id: z.string()
}).strict();

export default updateTicketSchema;
export {
  updateTicketParamsSchema
};