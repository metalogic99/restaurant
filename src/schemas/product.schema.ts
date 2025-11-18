import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  subcategory: z.string().min(1, "Subcategory is required"),
  description: z.string().min(1, "Description is required"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
