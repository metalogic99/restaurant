import { z } from "zod";

export const settingsSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  logo: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  vat: z.string().optional().nullable(),
  printerIP: z.string().optional().nullable(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
