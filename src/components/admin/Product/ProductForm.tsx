"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormValues } from "@/schemas/product.schema";
import { useCreateProduct } from "@/hooks/product.hooks";
import { toast } from "sonner";
import { useEffect } from "react";

interface AddProductFormProps {
  onSuccessClose?: () => void;
  defaultSubcategory: string; // Made required since we always pass it
}

const AddProductForm = ({ onSuccessClose, defaultSubcategory }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      subcategory: defaultSubcategory,
    },
  });

  // Set the subcategory value when component mounts
  useEffect(() => {
    setValue("subcategory", defaultSubcategory);
  }, [defaultSubcategory, setValue]);

  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = (data: ProductFormValues) => {
    // Ensure subcategory is always set to the default
    const productData = {
      ...data,
      subcategory: defaultSubcategory
    };
    
    createProduct(productData, {
      onSuccess: (res) => {
        toast.success(res?.success || "Product added successfully");
        reset();
        onSuccessClose?.();
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Failed to create product");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Chicken Momo"
            {...register("name")}
            disabled={isPending}
          />
          {errors.name ? (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          ) : (
            <p className="text-gray-500 text-sm">Enter product name</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (Rs.) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="e.g., 250"
            {...register("price", { valueAsNumber: true })}
            disabled={isPending}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Product description..."
          {...register("description")}
          disabled={isPending}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Hidden input to include subcategory in form data */}
      <input
        type="hidden"
        {...register("subcategory")}
        value={defaultSubcategory}
      />

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
            "Create Product"
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

export default AddProductForm;