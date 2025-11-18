import { z } from "zod";

export const userFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  userName: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  role: z.enum(["waiter", "receptionist", "chef"]),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
