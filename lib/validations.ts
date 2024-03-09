import { z } from "zod";
export const profileInputSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
        .string()
        .min(1, { message: "Email address is required" })
        .email({ message: "Email address is invalid" }),
    image: z.string().optional(),
    bio: z.string().optional(),
    role: z.string().optional(),
});
