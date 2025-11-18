"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subCategoryFormSchema,
  SubCategoryFormValues,
} from "@/schemas/sub-category.schema";
import { useUpdateSubCategory } from "@/hooks/sub-category.hooks";
import { useGetCategories } from "@/hooks/category.hooks";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  subcategory: {
    _id: string;
    name: string;
    parentCategory?: {
      _id: string;
      name: string;
    };
  };
}

const EditSubCategoryDialog = ({ subcategory }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: categories = [] } = useGetCategories();
  const { mutate: updateSubCategory, isPending } = useUpdateSubCategory();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: {
      name: subcategory.name,
      parentCategory: subcategory.parentCategory?._id || "",
    },
  });

  // Reset values when dialog opens or subcategory changes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      reset({
        name: subcategory.name,
        parentCategory: subcategory.parentCategory?._id || "",
      });
    }
  };

  const onSubmit = (data: SubCategoryFormValues) => {
    updateSubCategory(
      { id: subcategory._id, ...data },
      {
        onSuccess: () => {
          toast.success("Subcategory updated");
          setOpen(false);
        },
        onError: () => {
          toast.error("Update failed");
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Subcategory</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Subcategory Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              disabled={isPending}
              placeholder="e.g., Veg Starters"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parentCategory">Parent Category</Label>
            <Controller
              name="parentCategory"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
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

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditSubCategoryDialog;
