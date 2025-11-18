"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormValues } from "@/schemas/product.schema";
import { useUpdateProduct } from "@/hooks/product.hooks";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

interface EditProductDialogProps {
  product: Product & {
    subcategory: {
      _id: string;
      name: string;
      category?: {
        _id: string;
        name: string;
      };
    };
  };
}

const EditProductDialog = ({ product }: EditProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
  });

  // Reset form with product data when dialog opens
  useEffect(() => {
    if (open) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        subcategory: product.subcategory?._id || "",
      });
    }
  }, [open, product, reset]);

  const onSubmit = (formData: ProductFormValues) => {
    // Keep the same subcategory when updating
    const updateData = {
      ...formData,
      subcategory: product.subcategory._id,
    };

    updateProduct(
      { id: product._id, data: updateData },
      {
        onSuccess: () => {
          toast.success("Product updated successfully");
          setOpen(false);
        },
        onError: (err: Error) => {
          toast.error(err?.message || "Failed to update product");
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-1">
              <span className="animate-spin h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full" />
              <span className="text-xs">Updating</span>
            </div>
          ) : (
            <Edit className="w-4 h-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Product</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input {...register("name")} disabled={isPending} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (Rs.) *</Label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                disabled={isPending}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Subcategory Display - Read Only */}
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                {product.subcategory?.name || "No Subcategory"}
              </div>
              <p className="text-xs text-gray-500">
                Subcategory cannot be changed during edit
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              rows={3}
              {...register("description")}
              disabled={isPending}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                </div>
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

export default EditProductDialog;
