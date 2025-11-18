import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExpenseInput, expenseSchema } from "@/schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormErr from "./FormErr";
import { Button } from "@/components/ui/button";
import { useEditExpense } from "@/hooks/expense.hooks";
import { useState } from "react";

const EditExpense = ({
  children,
  expense,
}: {
  children: React.ReactNode;
  expense: Expense;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: expense?.name,
      amount: expense?.amount,
      date: String(expense?.date).split("T")[0],
    },
  });
  const { mutate: editExpense, isPending } = useEditExpense();
  const [open, setOpen] = useState(false);

  const onSubmit = (data: any) => {
    editExpense(
      { expenseId: expense._id, data: data },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{children}</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Today&apos;s Special</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4 w-full"
          >
            <div className="flex-1 min-w-[200px]">
              <Label>
                Item<span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                {...register("name")}
                placeholder="Potato"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FormErr>{errors.name?.message}</FormErr>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Label>
                Amount<span className="text-red-500">*</span>
              </Label>
              <input
                type="number"
                {...register("amount")}
                placeholder="20"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FormErr>{errors.amount?.message}</FormErr>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Label>
                Date<span className="text-red-500">*</span>
              </Label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FormErr>{errors.date?.message}</FormErr>
            </div>

            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">{isPending ? "Editing.." : "Edit"}</Button>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditExpense;
