import { z } from "zod";

export const reservationFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  peopleNos: z.coerce
    .number({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number is required",
    })
    .min(1, "People number must be greater than 0"),
  phone: z.string().min(10, "Phone number is required"),
  preOrder: z.coerce.boolean(),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
