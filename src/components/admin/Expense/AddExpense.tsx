"use client";
import { ExpenseInput, expenseSchema } from "@/schemas/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormErr from "./FormErr";
import { useAddExpense } from "@/hooks/expense.hooks";
import { toast } from "sonner";
import LoadingSmall from "@/components/shared/LoadingSmall";
import { Label } from "@radix-ui/react-label";

const AddExpense = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    reValidateMode: "onChange",
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { mutate: addExpense, isPending } = useAddExpense();

  const onSubmit = (data: ExpenseInput) => {
    console.log(data);
    addExpense(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 items-end"
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

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          {isPending ? (
            <div className="h-full w-full flex items-center justify-center">
              <LoadingSmall />
            </div>
          ) : (
            "Add Expense"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
