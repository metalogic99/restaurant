import React from "react";

const AdminCommon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      {children}
    </div>
  );
};

export default AdminCommon;
