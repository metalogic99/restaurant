"use client";
import React, { useState } from "react";
import DisplayTables from "./DisplayTables";
import {
  useAddTable,
  useGetAllTables,
  useUpdateTable,
} from "@/hooks/tables.hooks";
import AdminError from "@/components/admin/AdminError";
import Loading from "@/components/shared/Loading";
import LoadingSmall from "@/components/shared/LoadingSmall";
import { toast } from "sonner";

const TableSection = () => {
  const [tableName, setTableName] = useState("");
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  const { data, error, isLoading } = useGetAllTables();
  const { mutate: addTable, isPending } = useAddTable();
  const { mutate: updateTable, isPending: updatePending } = useUpdateTable();

  const handleSaveTable = () => {
    if (editingTable) {
      if (!tableName) {
        return;
      }
      updateTable(
        { tableId: editingTable._id, update: { name: tableName } },
        {
          onSuccess: (data) => {
            console.log(data.message);
            toast.error(data.message);
          },
          onError: (error) => {
            console.log(error.message);
            toast.error(error.message);
          },
        }
      );
    } else {
      addTable(tableName, {
        onSuccess: (data) => {
          console.log(data.message);
          toast.success(data.message);
        },
        onError: (error) => {
          console.log(error.message);
          toast.success(error.message);
        },
      });
    }
  };

  const handleCancel = () => {
    setTableName("");
    setEditingTable(null);
  };
  if (error) {
    return <AdminError error={error.message} />;
  }
  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return <AdminError error="Error Fetching Tables" />;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Table Management</h1>
              <p className="text-gray-600 mt-1">
                Add, edit, and manage your restaurant tables
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6">
          <h3 className="text-lg font-semibold mb-4 text-forestGreen">
            {editingTable ? "Edit Table" : "Add New Table"}
          </h3>
          <div>
            <div className="max-w-md">
              <div className="space-y-2">
                <label
                  htmlFor="tableName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Table Name/Number *
                </label>
                <input
                  id="tableName"
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g., Table 1, VIP Table, Corner Table"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forestGreen focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleSaveTable}
                disabled={!tableName.trim()}
                className="bg-forestGreen hover:bg-forestGreen/90 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
              >
                {isPending || updatePending ? (
                  <LoadingSmall />
                ) : (
                  <span>{editingTable ? "Update Table" : "Save Table"}</span>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <DisplayTables
          tables={data.data}
          setEditingTable={setEditingTable}
          setTableName={setTableName}
        />
      </div>
    </div>
  );
};

export default TableSection;
