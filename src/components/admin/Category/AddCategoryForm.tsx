"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryFormSchema,
  CategoryFormValues,
} from "@/schemas/category.schema";
import { useCreateCategory } from "@/hooks/category.hooks";
import { toast } from "sonner";

interface AddCategoryFormProps {
  onSuccessClose?: () => void;
}

const AddCategoryForm = ({ onSuccessClose }: AddCategoryFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    mode: "onChange", // Validate on change
  });

  const { mutate: createCategory, isPending } = useCreateCategory();

  const onSubmit = (data: CategoryFormValues) => {
    if (!data.name || data.name.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    createCategory(data, {
      onSuccess: (res) => {
        toast.success(res?.success || "Category added successfully");
        reset();
        onSuccessClose?.();
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Failed to create category");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Appetizers"
          {...register("name")}
          disabled={isPending}
        />
        {errors.name ? (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        ) : (
          <p className="text-gray-500 text-sm">Enter a category name</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="submit"
          disabled={isPending || !isValid}
          className="bg-green-600 hover:bg-green-700"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Category"
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset();
            onSuccessClose?.();
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
