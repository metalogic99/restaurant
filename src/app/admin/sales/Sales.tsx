"use client";
import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useGetSales } from "@/hooks/sales.hooks";
import SummarySection from "./SummarySection";
import FilterSection from "./FilterSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { exportToExcel } from "@/utils/exportToExcel";

const SalesReportPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const time = searchParams.get("time");
  const status = searchParams.get("status");
  const type = searchParams.get("orderType");
  const to = searchParams.get("to");
  const from = searchParams.get("from");
  const pageStr = searchParams.get("page");
  const totalRevenue = searchParams.get("totalRevenue");
  const totalFilteredOrders = searchParams.get("totalFilteredOrders");
  const cancelledOrders = searchParams.get("cancelledOrders");
  const page = Number(pageStr ?? 1);

  const { data } = useGetSales({
    page: page,
    time: time ?? "",
    orderType: type ?? "",
    status: status ?? "",
    to: to ?? "",
    from: from ?? "",
  });

  const salesData = useMemo(() => {
    return data ? data.data.orders : [];
  }, [data]);

  const totalPages = Math.ceil(
    page === 1
      ? data
        ? data.data.totalFilteredOrders / 20
        : 0
      : Number(totalFilteredOrders ? totalFilteredOrders : 0) / 20
  );

  const handlePageChange = (setPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (setPage === 1) {
      params.delete("page");
      params.delete("totalFilteredOrders");
      params.delete("cancelledOrders");
      params.delete("totalRevenue");
    } else {
      params.set("page", String(setPage));
      if (!totalRevenue && !cancelledOrders && !totalRevenue) {
        params.set(
          "totalRevenue",
          data ? String(data.data.totalRevenue) : String(0)
        );
        params.set(
          "totalFilteredOrders",
          data ? String(data.data.totalFilteredOrders) : String(0)
        );
        params.set(
          "cancelledOrders",
          data ? String(data.data.cancelledOrders) : String(0)
        );
      }
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl ?? pathname);
  };

  const handleExport = () => {
    const FormattedData = salesData.map((data) => {
      return {
        ID: data._id,
        Date: data.createdAt.split("T")[0],
        Type: data.orderType,
        Products: data.orderedProducts
          .map((product) => {
            return `${product.product.name}-${product.quantity}`;
          })
          .join(),
        Gross: data.grossTotal,
        Discount: data.discount,
        Total: data.total,
      };
    });
    exportToExcel(FormattedData, `sales-${new Date()}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sales Report Dashboard
          </h1>
          <p className="text-gray-600">
            Track and analyze your sales performance
          </p>
        </div>

        <SummarySection data={data?.data} page={page} />
        <FilterSection />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Sales Data
              </h2>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90 flex items-center space-x-2 bg-forestGreen"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-mintGreen">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.map((order: Order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.createdAt.split("T")[0]}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.orderType === "dine-in"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {order.orderType === "dineIn" ? "Dine In" : "Takeaway"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "completed"
                            ? "text-forestGreen"
                            : "text-red-800"
                        } ${
                          order.status === "completed"
                            ? "bg-[#a8e6a1]"
                            : "bg-[#f4c7b3]"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Completed"
                          : "Cancelled"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderedProducts.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rs.{order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {page ? (page - 1) * 30 : 0} to{" "}
                {Math.min(page * 30, salesData?.length)} of{" "}
                {data ? data.data.totalFilteredOrders : 0} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (Ipage) => (
                    <button
                      key={Ipage}
                      onClick={() => handlePageChange(Ipage)}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        Ipage === page
                          ? "text-white bg-forestGreen"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {Ipage}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportPage;
