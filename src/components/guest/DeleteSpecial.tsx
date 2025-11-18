"use client";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteSpecial } from "@/hooks/special.hooks";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteSpecialProps {
  id: string;
  // name: string;
}

export default function DeleteSpecial({ id }: DeleteSpecialProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteSpecial, isPending } = useDeleteSpecial();

  const handleDelete = () => {
    deleteSpecial(id, {
      onSuccess: (data) => {
        toast.success(data.message || "Special deleted");
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete");
        setOpen(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          className="text-red-500 hover:text-red-700 p-2"
          aria-label="Delete"
        >
          <Trash2 size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Special?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            <div className="flex items-center gap-2">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isPending ? "Deleting..." : "Delete"}</span>
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
