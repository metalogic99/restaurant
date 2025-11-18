"use client";

import { useGetAllTables } from "@/hooks/tables.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const TableStatusCard = () => {
  const { data, isLoading, isError } = useGetAllTables();

  if (isLoading)
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 flex justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
        </CardContent>
      </Card>
    );

  if (isError)
    return (
      <Card className="shadow-lg bg-red-50 border-red-200">
        <CardContent className="p-8 text-center text-red-500">
          Error loading tables
        </CardContent>
      </Card>
    );

  const tables = data?.data || [];
  const occupiedTables = tables.filter((table) => table.status === "occupied");
  const availableTables = tables.filter(
    (table) => table.status === "available"
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Table Status
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Occupied Tables */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-amber-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="font-medium text-amber-800">
                  Occupied Tables
                </span>
              </div>
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                {occupiedTables.length}
              </span>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto">
              {occupiedTables.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No occupied tables
                </div>
              ) : (
                <div className="space-y-3">
                  {occupiedTables.map((table) => (
                    <div
                      key={table._id}
                      className="bg-white border border-amber-200 rounded-lg p-3 flex items-center justify-start shadow-sm"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Table {table.tableName}
                        </h3>
                        <p className="text-sm text-amber-600">Occupied</p>
                      </div>
                      {/* Removed right side colored circle */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Available Tables */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-green-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">
                  Available Tables
                </span>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                {availableTables.length}
              </span>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto">
              {availableTables.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No available tables
                </div>
              ) : (
                <div className="space-y-3">
                  {availableTables.map((table) => (
                    <div
                      key={table._id}
                      className="bg-white border border-green-200 rounded-lg p-3 flex items-center justify-start shadow-sm"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Table {table.tableName}
                        </h3>
                        <p className="text-sm text-green-600">Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableStatusCard;
