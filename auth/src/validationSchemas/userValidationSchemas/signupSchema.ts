import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email format"), // Must be a valid email
  password: z.string()
    .min(8, "Password must be at least 8 characters long") // Minimum length
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least 1 uppercase
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least 1 lowercase
    .regex(/[0-9]/, "Password must contain at least one number") // At least 1 number
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"), // At least 1 special char
}).strict();

export default signupSchema;