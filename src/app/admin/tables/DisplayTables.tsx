import TableCard from "@/components/admin/TableCard";
import React from "react";

const DisplayTables = ({
  setEditingTable,
  tables,
  setTableName,
}: {
  setEditingTable: any;
  tables: Table[];
  setTableName: any;
}) => {
  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setTableName(table.tableName);
    console.log(table);
  };
  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Table Name
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tables &&
              tables.map((table) => (
                <TableCard
                  key={table._id}
                  table={table}
                  handleEditTable={handleEditTable}
                />
              ))}
            {tables && tables.length === 0 && (
              <tr>
                <td colSpan={2} className="py-8 px-4 text-center text-gray-500">
                  No tables added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTables;
