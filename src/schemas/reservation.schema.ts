import { z } from "zod";

export const reservationFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  peopleNos: z.number().min(1, "People number must be greater than 0"),
  phone: z.string().min(10, "string phone number is required"),
  preOrder: z.boolean().default(true),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
