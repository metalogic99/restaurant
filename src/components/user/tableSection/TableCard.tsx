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

  return (
    <div
      onClick={() => router.push(`/${table._id}`)}
      className="bg-white rounded-xl h-full shadow-sm border cursor-pointer border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col"
    >
      {/* Reduced padding for mobile (p-3), normal for desktop (p-6) */}
      <div className="p-3 md:p-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="bg-gray-100 p-2 rounded-lg w-fit">
            <span className="text-sm md:text-lg font-bold text-gray-900 whitespace-nowrap">
              {table.tableName}
            </span>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-medium border flex items-center gap-1 w-fit ${getStatusColor(table.status)}`}
          >
            {getStatusIcon(table.status)}
            <span className="capitalize">{table.status}</span>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-6 pb-4 flex-grow">
        {table.status === "occupied" ? (
          <div className="bg-red-50 rounded-lg p-2 md:p-4 mb-3 border border-red-100">
            <h4 className="text-xs md:text-sm font-medium text-red-900 mb-1 flex items-center gap-1">
              <DollarSign className="w-3  md:w-4 h-4" />
              Orders
            </h4>
            <div className="text-[10px] md:text-sm">
              <span className="text-red-700">Dur:</span>{" "}
              {table.duration.split(" ")[4]}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-2 md:p-4 mb-3 border border-dashed border-gray-200">
            <p className="text-[10px] md:text-sm text-gray-400 text-center">
              Table Ready
            </p>
          </div>
        )}
        <ActionsTable table={table} />
      </div>
    </div>
  );
};

export default TableCard;
