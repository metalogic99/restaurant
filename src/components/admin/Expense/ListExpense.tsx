"use client";

import { useDeleteExpense, useGetExpense } from "@/hooks/expense.hooks";
import React, { useMemo } from "react";
import EditExpense from "./EditExpense";
import { toast } from "sonner";
import { AlertDialogConfirm } from "../Sub Category/AlertDialogConfirm";
import ChooseFilter from "./ChooseFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ListExpense = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const to = searchParams.get("to");
  const time = searchParams.get("time");
  const from = searchParams.get("from");
  const pageStr = searchParams.get("page");
  const page = Number(pageStr ?? 1);
  const totalString = searchParams.get("totalAmount");
  const totalExpString = searchParams.get("totalExpense");
  const itemsPerPage = 30;

  const { data, isLoading, error } = useGetExpense(
    time ?? "",
    to ?? "",
    from ?? "",
    page
  );
  const { mutate: deleteExpense, isPending } = useDeleteExpense(
    time ?? "",
    to ?? "",
    from ?? "",
    page
  );
  const totalAmount = useMemo(() => {
    return totalString
      ? Number(totalString)
      : data && data.totalAmount
      ? data.totalAmount
      : 0;
  }, [data, totalString]);

  const totalExpenseLength = useMemo(() => {
    return totalExpString
      ? Number(totalExpString)
      : data && data.totalExpense
      ? data.totalExpense
      : 0;
  }, [data, totalExpString]);

  const expenses = useMemo(() => {
    return data && data.expenses ? data.expenses : [];
  }, [data]);

  console.log("expense to expand", expenses);

  const totalPages = Math.ceil(totalExpenseLength / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
      params.delete("totalAmount");
      params.delete("totalExpense");
    } else {
      params.set("page", String(page));
      params.set("totalAmount", String(totalAmount));
      params.set("totalExpense", String(totalExpenseLength));
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl ?? pathname);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (page > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-l-md hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm border-t border-b border-r border-gray-300 hover:bg-gray-50 transition-colors ${
            page === i ? "bg-blue-500 text-white hover:bg-blue-600" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-r-md hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className=" py-3 px-2">
        <span className="text-md font-semibold">Filter by Category:</span>
        <ChooseFilter />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          {expenses.length === 0 ? (
            <tbody className="w-full text-center ">
              <tr>
                {error ? (
                  <td colSpan={4} className="text-red-800 font-semibold">
                    {error.message}
                  </td>
                ) : (
                  <td colSpan={4}>
                    {isLoading ? "Loading expenses..." : "No expense Available"}
                  </td>
                )}
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense: any) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rs.{expense.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {String(expense.date).split("T")[0]}
                  </td>
                  <td className="px-6 py-4 flex whitespace-nowrap text-sm space-x-2">
                    <EditExpense expense={expense}>
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors">
                        Edit
                      </button>
                    </EditExpense>
                    <AlertDialogConfirm
                      title="Delete Expense"
                      onConfirm={() => handleDeleteExpense(expense._id)}
                      description={`Are you sure you want to delete expense named ${expense.name}`}
                    >
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors">
                        {isPending ? "Deleting...." : "Delete"}
                      </button>
                    </AlertDialogConfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <div className="text-lg font-semibold text-gray-900">
            Total: Rs.{totalAmount}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, totalExpenseLength)} of {totalExpenseLength}{" "}
              expenses
            </div>

            <div className="flex justify-center sm:justify-end">
              <div className="flex">{getPaginationButtons()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListExpense;
