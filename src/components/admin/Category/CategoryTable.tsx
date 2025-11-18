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
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteCategory } from "@/hooks/category.hooks";
import { toast } from "sonner";
import { useState } from "react";
import EditCategoryDialog from "./EditCategory";

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable = ({ categories = [] }: CategoryTableProps) => {
  const { mutate: deleteCategory, isPending } = useDeleteCategory();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;
    deleteCategory(selectedId, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        setSelectedId(null);
      },
      onError: (err: Error) => {
        toast.error(err?.message || "Failed to delete");
        setSelectedId(null);
      },
    });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant="outline" size="icon">
                  <EditCategoryDialog
                    categoryId={category._id}
                    currentName={category.name}
                  />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setSelectedId(category._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete category? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
