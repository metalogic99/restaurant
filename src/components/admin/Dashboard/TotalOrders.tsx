"use client";

import { useGetTodayOrders } from "@/hooks/order.hooks";
import { Loader2, AlertCircle, PackageX } from "lucide-react";

const TodayOrdersCard = () => {
  const { data, isLoading, isError } = useGetTodayOrders();

  const totalOrders = data?.data?.length || 0;

  return (
    <div className=" p-6 rounded-2xl shadow-md w-full flex flex-col items-center justify-center text-center min-h-[160px] border border-gray-100">
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin text-gray-500 mb-2" />
          <p className="text-gray-500 text-sm">Loading </p>
        </>
      ) : isError ? (
        <>
          <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
          <p className="text-red-600 font-medium">Failed to load orders</p>
        </>
      ) : totalOrders === 0 ? (
        <>
          <PackageX className="w-7 h-7 text-gray-400 mb-1" />
          <h2 className="text-lg font-semibold text-gray-500">
            No Orders Found
          </h2>
          <p className="text-sm text-gray-400">
            No orders have been placed today.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-lg font-medium text-gray-600 mb-1">
            📦 Today’s Orders
          </h2>
          <p className="text-4xl font-extrabold text-green-600">
            {totalOrders}
          </p>
          <span className="text-sm text-gray-400 mt-1">
            orders placed today
          </span>
        </>
      )}
    </div>
  );
};

export default TodayOrdersCard;
