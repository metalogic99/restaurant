import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(1, "Expense cannot be 0"),
  date: z.string().min(1, "Date is required"),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
