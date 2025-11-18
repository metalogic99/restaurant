import React, { useState } from "react";
import Actions from "./Actions";
import { useDeleteTable } from "@/hooks/tables.hooks";
import { toast } from "sonner";
import QRModal from "./QRModal";

const TableCard = ({
  table,
  handleEditTable,
}: {
  table: Table;
  handleEditTable: any;
}) => {
  const [showQR, setShowQR] = useState(false);

  const { mutate: deleteTable, isPending: deleting } = useDeleteTable();

  const handleDeleteTable = (tableId: string) => {
    if (!tableId) {
      return;
    }
    deleteTable(tableId, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleTableClick = () => {
    setShowQR(true);
  };

  return (
    <tr className="border-b hover:bg-gray-50" onClick={handleTableClick}>
      <td className="py-4 px-4">
        <div className="font-semibold text-gray-900">{table.tableName}</div>
      </td>
      <td className="py-4 px-4 text-right">
        <Actions
          pending={deleting}
          handleDeleteTable={handleDeleteTable}
          handleEditTable={handleEditTable}
          table={table}
        />
      </td>
      {showQR && (
        <QRModal
          table={table}
          onCancel={(e: any) => {
            e.stopPropagation();
            console.log("clicked on cancle");
            setShowQR(false);
          }}
        />
      )}
    </tr>
  );
};

export default TableCard;
