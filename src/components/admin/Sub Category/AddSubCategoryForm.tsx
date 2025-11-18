"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  SubCategoryFormValues,
  subCategoryFormSchema,
} from "@/schemas/sub-category.schema";
import { toast } from "sonner";
import { useCreateSubCategory } from "@/hooks/sub-category.hooks";
import { useGetCategories } from "@/hooks/category.hooks";

interface SubCategoryFormProps {
  onCancel: () => void;
}

export function SubCategoryForm({ onCancel }: SubCategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryFormSchema),
    mode: "onChange",
  });

  const { mutate: createSubCategory, isPending } = useCreateSubCategory();
  const { data: categories = [] } = useGetCategories();

  const onSubmit = (data: SubCategoryFormValues) => {
    createSubCategory(data, {
      onSuccess: () => {
        toast.success("Subcategory created successfully");
        reset();
        onCancel();
      },
      onError: () => {
        toast.error("Failed to create subcategory");
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add New Subcategory</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parentCategory">Parent Category *</Label>
            <Controller
              name="parentCategory"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id} // Use _id instead of name
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.parentCategory && (
              <p className="text-red-500 text-sm">
                {errors.parentCategory.message}
              </p>
            )}
          </div>

          {/* Subcategory Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Subcategory Name *</Label>
            <Input
              id="name"
              placeholder="Enter subcategory name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPending ? "Saving..." : "Save Subcategory"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
