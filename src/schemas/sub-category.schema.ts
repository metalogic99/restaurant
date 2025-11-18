import { z } from "zod";

export const subCategoryFormSchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  parentCategory: z.string().min(1, "Parent category is required"),
});

export type SubCategoryFormValues = z.infer<typeof subCategoryFormSchema>;
