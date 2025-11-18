"use client";
import React, { useMemo } from "react";
import { TrendingUp, DollarSign, ShoppingBag, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SummarySection = ({ data, page }: { data: any; page: number }) => {
  const searchParams = useSearchParams();
  const totalRevenue = searchParams.get("totalRevenue");
  const totalFilteredOrders = searchParams.get("totalFilteredOrders");
  const cancelledOrders = searchParams.get("cancelledOrders");
  const summaryStats = useMemo(() => {
    const revenue =
      page === 1 ? data?.totalRevenue : Number(totalRevenue ? totalRevenue : 0);

    const totalOrders =
      page === 1
        ? data?.totalFilteredOrders
        : Number(totalFilteredOrders ? totalFilteredOrders : 0);

    const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

    const cancelled =
      page === 1
        ? data?.cancelledOrders
        : Number(cancelledOrders ? cancelledOrders : 0);

    return {
      revenue,
      totalOrders,
      avgOrderValue,
      cancelled,
    };
  }, [cancelledOrders, totalFilteredOrders, totalRevenue, data, page]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-fore">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">
              Rs.{summaryStats.revenue?.toFixed(2)}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-forestGreen" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-forestGreen">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">
              {summaryStats.totalOrders}
            </p>
          </div>
          <ShoppingBag className="h-8 w-8 text-forestGreen" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-mintGreen">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
            <p className="text-2xl font-bold text-gray-800">
              Rs.{summaryStats.avgOrderValue?.toFixed(2)}
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-mintGreen" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Cancelled Orders
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {summaryStats.cancelled}
            </p>
          </div>
          <Clock className="h-8 w-8 text-hover" />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
