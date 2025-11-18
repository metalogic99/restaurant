"use client";

import {
  useGetOrderbyStatus,
} from "@/hooks/order.hooks";
import { Loader2 } from "lucide-react";

const OrderStatus = () => {
  const pending = useGetOrderbyStatus("pending");
  const completed = useGetOrderbyStatus("completed");
  const cancelled = useGetOrderbyStatus("cancelled");

  const summaries = [
    {
      label: "Pending",
      color: "bg-amber-50 text-amber-700 border-amber-200",
      icon: "⏳",
      data: pending,
    },
    {
      label: "Completed",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: "✅",
      data: completed,
    },
    {
      label: "Cancelled",
      color: "bg-red-50 text-red-700 border-red-200",
      icon: "❌",
      data: cancelled,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {summaries.map(({ label, color, icon, data }, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-4 rounded-lg border ${color}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{icon}</span>
              <span className="font-medium">{label}</span>
            </div>

            {data.isLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-current" />
            ) : data.isError ? (
              <span className="text-sm text-red-500">Error</span>
            ) : (
              <span className="text-2xl font-bold">
                {data.data?.data?.length || 0}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
