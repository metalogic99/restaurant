"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const FilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const time = searchParams.get("time");
  const status = searchParams.get("status");
  const type = searchParams.get("orderType");
  const to = searchParams.get("to");
  const from = searchParams.get("from");

  const [dateFilter, setDateFilter] = useState(time ?? "");
  const [customTo, setCustomTo] = useState<any>(to);
  const [customFrom, setCustomFrom] = useState<any>(from);

  const resetFilters = () => {
    router.push("/admin/sales");
  };

  const setQueryInUrl = (query: any[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("totalFilteredOrders");
    params.delete("cancelledOrders");
    params.delete("totalRevenue");
    let newUrl;
    query.forEach((item) => {
      if (!item.value) {
        params.delete(item.type);
        if (item.type === "time") {
          params.delete("to");
          params.delete("from");
        }
      } else {
        if (item.type === "time" && item.value !== "custom") {
          params.delete("to");
          params.delete("from");
        }
        params.set(item.type, item.value);
      }
      newUrl = `${pathname}?${params.toString()}`;
    });
    router.push(newUrl ?? pathname);
  };

  const timeFilterHandler = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "custom") {
      setDateFilter(e.target.value);
      return;
    }
    setDateFilter(e.target.value);
    setQueryInUrl([{ type: "time", value: e.target.value }]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={dateFilter ?? ""}
            onChange={timeFilterHandler}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Last one Month</option>
            <option value="yearly">Last one Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Type
          </label>
          <select
            value={type ?? ""}
            onChange={(e) =>
              setQueryInUrl([{ type: "orderType", value: e.target.value }])
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
          >
            <option value="">All Types</option>
            <option value="dineIn">Dine In</option>
            <option value="takeaway">Takeaway</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Status
          </label>
          <select
            value={status ?? ""}
            onChange={(e) =>
              setQueryInUrl([{ type: "status", value: e.target.value }])
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {dateFilter === "custom" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            disabled={!customTo || !customFrom}
            onClick={() => {
              setQueryInUrl([
                { type: "time", value: "custom" },
                { type: "to", value: customTo },
                { type: "from", value: customFrom },
              ]);
            }}
            className="py-2 px-8 rounded-lg cursor-pointer bg-forestGreen text-white"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
