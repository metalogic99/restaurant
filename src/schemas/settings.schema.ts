import { z } from "zod";

export const settingsSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  logo: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
