import LoadingSmall from "@/components/shared/LoadingSmall";
import { useUpdateTableAll } from "@/hooks/tables.hooks";
import React from "react";
import ClearOrders from "./ClearOrders";

const ActionsTable = ({ table }: { table: Table }) => {
  const { mutate: updateTable, isPending } = useUpdateTableAll(table._id);

  const occupyHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTable(
      { update: { status: "occupied" } },
      {
        onSuccess: (data) => {
          console.log(data.message);
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  return (
    <>
      {table.status === "occupied" ? (
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
            View Order
          </button>
          <ClearOrders
            tableId={table._id}
            orderId={table.activeOrderId ? table.activeOrderId : ""}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={occupyHandler}
            className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
          >
            {isPending ? <LoadingSmall /> : "Occupy"}
          </button>
        </div>
      )}
    </>
  );
};

export default ActionsTable;
