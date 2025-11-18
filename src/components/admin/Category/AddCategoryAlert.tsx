"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCategoryForm from "./AddCategoryForm";
import { useState } from "react";

const AddCategoryAlert = () => {
  const [open, setOpen] = useState(false); // state to control dialog

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Category</AlertDialogTitle>
        </AlertDialogHeader>

        <AddCategoryForm onSuccessClose={() => setOpen(false)} />

        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCategoryAlert;
