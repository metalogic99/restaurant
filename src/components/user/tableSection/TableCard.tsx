import { CheckCircle, DollarSign, Users, XCircle } from "lucide-react";
import React from "react";
import ActionsTable from "./ActionsTable";
import { useRouter } from "next/navigation";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "available":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "occupied":
      return <Users className="w-5 h-5 text-red-500" />;
    default:
      return <XCircle className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200";
    case "occupied":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const TableCard = ({ table }: { table: Table }) => {
  const router = useRouter();

  const tableClickHandler = (tableId: string) => {
    router.push(`/${tableId}`);
  };
  return (
    <div
      onClick={() => tableClickHandler(table._id)}
      className="bg-white rounded-xl h-fit shadow-sm border cursor-pointer border-gray-200 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <span className="text-lg font-bold text-gray-900">
                {table.tableName}
              </span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
              table.status
            )}`}
          >
            {getStatusIcon(table.status)}
            {table.status}
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        {table.status === "occupied" ? (
          <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-100">
            <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Current Orders
            </h4>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-red-700">Duration:</span>{" "}
                {table.duration.split(" ")[4]}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white flex-1 rounded-lg p-4 mb-4 border border-mintGreen">
            <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Current Orders
            </h4>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-red-700">Duration:</span>
              </div>
            </div>
          </div>
        )}
        <ActionsTable table={table} />
      </div>
    </div>
  );
};

export default TableCard;


