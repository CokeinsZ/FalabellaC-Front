import * as z from "zod";

export const loginSchema = z.object({
  user: z.string().min(2, { message: "User should be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters." }),
});

