import AddExpense from "@/components/admin/Expense/AddExpense";
import ListExpense from "@/components/admin/Expense/ListExpense";
import { Suspense } from "react";

const ExpenseTracker = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Expense Tracker
        </h1>

        <AddExpense />
        <Suspense>
          <ListExpense />
        </Suspense>
      </div>
    </div>
  );
};

export default ExpenseTracker;
