"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryFormSchema,
  CategoryFormValues,
} from "@/schemas/category.schema";
import { useUpdateCategory } from "@/hooks/category.hooks";
import { toast } from "sonner";

interface EditCategoryDialogProps {
  categoryId: string;
  currentName: string;
}

const EditCategoryDialog = ({
  categoryId,
  currentName,
}: EditCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: currentName },
  });

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const onSubmit = (data: CategoryFormValues) => {
    updateCategory(
      { id: categoryId, name: data.name },
      {
        onSuccess: () => {
          toast.success("Category updated successfully");
          setOpen(false);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to update category");
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => reset({ name: currentName })}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Category</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" {...register("name")} disabled={isPending} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditCategoryDialog;
