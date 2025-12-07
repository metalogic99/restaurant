"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProductRank,
} from "@/hooks/product.hooks";
import { toast } from "sonner";
import { useState, useMemo, useEffect } from "react";

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

import { Skeleton } from "@/components/ui/skeleton";
import EditProductDialog from "./EditProduct";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// ========== INTERFACES ==========
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  subcategory?: {
    name: string;
    _id: string;
  };
  rank: number;
}

interface ProductTableProps {
  subcategoryId?: string;
}

// ========== SORTABLE ROW COMPONENT ==========
function SortableRow({ product, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white"
    >
      {children}
    </TableRow>
  );
}

// ========== MAIN COMPONENT ==========
const ProductTable = ({ subcategoryId }: ProductTableProps) => {
  const { data, isLoading, error } = useGetProducts();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { mutate: updateProductRank } = useUpdateProductRank();

  // FILTER PRODUCTS
  const products: Product[] = useMemo(() => {
    const allProducts = data?.products || [];

    if (!subcategoryId) return allProducts;

    return allProducts.filter(
      (product: Product) => product.subcategory?._id === subcategoryId
    );
  }, [data?.products, subcategoryId]);

  const [items, setItems] = useState<Product[]>(products);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // slightly drag before moving
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((p) => p._id === active.id);
        const newIndex = prev.findIndex((p) => p._id === over.id);

        console.log("new index is", newIndex + 1);
        updateProductRank(
          { id: active.id, rank: newIndex + 1 },
          {
            onSuccess: () => {
              toast.success("Rank updated Successfully");
            },

            onError: () => {
              toast.error("Rank update failed");
            },
          }
        );
        const newOrder = arrayMove(prev, oldIndex, newIndex);

        console.log("Dropped:", active.id);
        console.log(
          "New order:",
          newOrder.map((p) => p.name)
        );

        return newOrder;
      });
    }
  };

  // DELETE PRODUCT
  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        setDeletingId(null);
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Failed to delete product");
        setDeletingId(null);
      },
    });
  };

  if (error) {
    return <div className="text-red-500 p-4">Error loading products</div>;
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            {!subcategoryId && <TableHead>Subcategory</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {Array.from({ length: subcategoryId ? 4 : 5 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : items.length === 0 ? (
            // No products
            <TableRow>
              <TableCell
                colSpan={subcategoryId ? 4 : 5}
                className="text-center py-8"
              >
                <div className="text-gray-500">
                  <p className="text-lg mb-2">No products found</p>
                  <p className="text-sm">Add Product</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((p) => p._id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((product) => (
                  <SortableRow key={product._id} product={product}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {product.description}
                    </TableCell>
                    <TableCell className="font-semibold">
                      Rs. {product.price}
                    </TableCell>

                    {!subcategoryId && (
                      <TableCell>
                        {product.subcategory?.name || "No Subcategory"}
                      </TableCell>
                    )}

                    <TableCell className="flex justify-end gap-2">
                      {product.subcategory && (
                        <EditProductDialog
                          product={{
                            ...product,
                            subcategory: product.subcategory,
                          }}
                        />
                      )}

                      {!product.subcategory && (
                        <Button variant="outline" size="icon" disabled>
                          <span className="text-xs">No Sub</span>
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            disabled={deletingId === product._id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete it?
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(product._id)}
                              disabled={isPending}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </SortableRow>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
