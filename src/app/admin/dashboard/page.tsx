import React from "react";
import { LayoutDashboard, ClipboardList } from "lucide-react";

import TableStatusCard from "@/components/admin/Dashboard/TableStatus";
import OrderStatus from "@/components/admin/Dashboard/OrderStatusSummray";
import TodayOrdersCard from "@/components/admin/Dashboard/TotalOrders";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-gray-700" />
            Admin Dashboard
          </h1>
        </header>

        {/* Overview Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ClipboardList className="text-gray-500 w-5 h-5" />
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <OrderStatus />
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition md:col-span-2">
              <TableStatusCard />
            </div>
          </div>
        </section>

        {/* Today Orders*/}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <TodayOrdersCard />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
