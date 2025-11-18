"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrderByTableId, updateOrder } from "@/services/order.service";

const TakeawayOrderView: React.FC = () => {
  const router = useRouter();
  const [tableIds, setTableIds] = useState<string[]>([]);
  const [orderMap, setOrderMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("takeawayTables") || "[]");

    const fetchOrderIds = async () => {
      const tempMap: Record<string, string> = {};
      const validTableIds: string[] = [];

      for (const tableId of saved) {
        try {
          const res = await getOrderByTableId(tableId);
          if (res?.data?._id) {
            tempMap[tableId] = res.data._id;
            validTableIds.push(tableId); // Only keep tableIds with actual orders
          }
        } catch (error) {
          console.log(error, "Failed to fetch order for:", tableId);
        }
      }

      setOrderMap(tempMap);
      setTableIds(validTableIds);
      // Update localStorage to only keep valid tableIds
      localStorage.setItem("takeawayTables", JSON.stringify(validTableIds));
    };

    fetchOrderIds();
  }, []);

  const handleClearOrder = async (tableId: string) => {
    const orderId = orderMap[tableId];
    if (!orderId) return;

    try {
      await updateOrder(orderId, undefined, "cancelled");
      const updated = tableIds.filter((id) => id !== tableId);
      setTableIds(updated);
      localStorage.setItem("takeawayTables", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to cancel order", err);
    }
  };

  const handleViewOrder = (tableId: string) => {
    router.push(`/takeaway/${tableId}`);
  };

  return (
    <Card className="p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Takeaway Orders
            </h2>
            <p className="text-sm text-gray-500">
              {tableIds.length} order{tableIds.length !== 1 ? "s" : ""} active
            </p>
          </div>
        </div>
      </div>

      {tableIds.length > 0 ? (
        <div className="space-y-3">
          {tableIds.map((tableId, index) => (
            <div
              key={tableId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700"
                >
                  #{index + 1}
                </Badge>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Table ID:{" "}
                    <span className="font-mono text-blue-600">{tableId}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Order ID: {orderMap[tableId]}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewOrder(tableId)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleClearOrder(tableId)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                >
                  Clear
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No orders found</p>
        </div>
      )}
    </Card>
  );
};

export default TakeawayOrderView;
