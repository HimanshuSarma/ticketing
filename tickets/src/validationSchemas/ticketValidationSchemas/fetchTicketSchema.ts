import { z } from "zod";

const fetchTicketSchema = z.object({
  id: z.string(),
  userId: z.string()
});

export default fetchTicketSchema;