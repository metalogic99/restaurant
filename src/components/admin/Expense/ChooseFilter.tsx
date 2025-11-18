import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ChooseFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const time = searchParams.get("time");
  const to = searchParams.get("to");
  const from = searchParams.get("from");


  const [dateFilter, setDateFilter] = useState(time ?? "");
  const [customTo, setCustomTo] = useState<any>(to);
  const [customFrom, setCustomFrom] = useState<any>(from);

  const setQueryInUrl = (query: any[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    let newUrl;
    params.delete("to");
    params.delete("from");
    query.forEach((item) => {
      if (!item.value) {
        params.delete(item.type);
      } else {
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
    <div>
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
      {dateFilter === "custom" && (
        <div className="mt-5">
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

export default ChooseFilter;
