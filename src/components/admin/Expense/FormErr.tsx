import React from "react";

const FormErr = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-red-500 font-semibold">{children}</span>;
};

export default FormErr;
