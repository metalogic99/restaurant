import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { AlertDialogConfirm } from "./Sub Category/AlertDialogConfirm";

const Actions = ({
  handleEditTable,
  handleDeleteTable,
  table,
  pending,
}: {
  handleEditTable: any;
  handleDeleteTable: any;
  table: Table;
  pending: boolean;
}) => {
  return (
    <div className="flex gap-2 justify-end flex-wrap">
      <button
        onClick={() => handleEditTable(table)}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Edit size={16} />
      </button>
      <AlertDialogConfirm
        title="Delete Table"
        onConfirm={() => handleDeleteTable(table._id)}
        description={`Are you sure you want to delete table ${table.tableName}`}
      >
        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          {pending ? "Deleting" : <Trash2 size={16} />}
        </button>
      </AlertDialogConfirm>
    </div>
  );
};

export default Actions;
