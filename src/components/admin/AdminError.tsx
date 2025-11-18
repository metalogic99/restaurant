import React from "react";

const AdminError = ({ error }: { error: any }) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-red-600">
      {error}
    </div>
  );
};

export default AdminError;
