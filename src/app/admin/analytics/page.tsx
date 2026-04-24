"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { useGetSales } from "@/hooks/sales.hooks";
import { useGetExpense } from "@/hooks/expense.hooks";
import FilterSection from "../sales/FilterSection";

const AnalyticsPage = () => {
  const searchParams = useSearchParams();

  // Filters from URL
  const time = searchParams.get("time") || "";
  const to = searchParams.get("to") || "";
  const from = searchParams.get("from") || "";

  // 1. Fetch Sales Data
  const { data: salesDataRaw, isLoading: salesLoading } = useGetSales({
    time,
    to,
    from,
    status: "completed",
    page: 1, // Analytics usually looks at the full set, not just page 1
    orderType: "",
  });

  // 2. Fetch Expense Data
  const { data: expenseDataRaw, isLoading: expenseLoading } = useGetExpense(
    time,
    to,
    from,
    1,
  );

  // 3. Process Data for Charting
  const chartData = useMemo(() => {
    const sales = salesDataRaw?.data?.orders || [];
    const expenses = expenseDataRaw?.expenses || [];

    // Map to store totals by date string
    const dailyMap: Record<
      string,
      { date: string; sales: number; expenses: number }
    > = {};

    sales.forEach((order: any) => {
      const date = order.createdAt.split("T")[0];
      if (!dailyMap[date]) dailyMap[date] = { date, sales: 0, expenses: 0 };
      dailyMap[date].sales += order.total;
    });

    expenses.forEach((exp: any) => {
      const date = exp.date.split("T")[0];
      if (!dailyMap[date]) dailyMap[date] = { date, sales: 0, expenses: 0 };
      dailyMap[date].expenses += exp.amount;
    });

    // Convert to sorted array
    return Object.values(dailyMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [salesDataRaw, expenseDataRaw]);

  // 4. Calculate Summaries
  const totals = useMemo(() => {
    const totalSales = salesDataRaw?.data?.totalRevenue || 0;
    const totalExpenses = expenseDataRaw?.totalAmount || 0;
    const netProfit = totalSales - totalExpenses;
    return { totalSales, totalExpenses, netProfit };
  }, [salesDataRaw, expenseDataRaw]);

  if (salesLoading || expenseLoading)
    return <div className="p-10 text-center">Loading Analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Business Analytics</h1>
        <p className="text-gray-600">Deep dive into your revenue vs spending</p>
      </div>

      <FilterSection />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Revenue"
          value={totals.totalSales}
          icon={<TrendingUp className="text-forestGreen" />}
          color="bg-green-50"
        />
        <SummaryCard
          title="Total Expenses"
          value={totals.totalExpenses}
          icon={<TrendingDown className="text-red-600" />}
          color="bg-red-50"
        />
        <SummaryCard
          title="Net Profit"
          value={totals.netProfit}
          icon={<DollarSign className="text-blue-600" />}
          color="bg-blue-50"
          isProfit
        />
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <PieChart className="h-5 w-5 text-gray-500" />
            Sales vs Expenses Trend
          </h2>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2D5A27" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(str: any) =>
                  new Date(str).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="top" align="right" height={36} />
              <Area
                type="monotone"
                dataKey="sales"
                name="Revenue"
                stroke="#2D5A27"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExp)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Section */}
    </div>
  );
};

// Internal Helper Component
const SummaryCard = ({ title, value, icon, color, isProfit }: any) => (
  <div className={`p-6 rounded-xl border border-gray-100 shadow-sm ${color}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
    </div>
    <div
      className={`text-2xl font-bold ${isProfit && value < 0 ? "text-red-600" : "text-gray-900"}`}
    >
      Rs. {value.toLocaleString()}
    </div>
  </div>
);

export default AnalyticsPage;
