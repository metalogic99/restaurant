import React, { Suspense } from "react";
import SalesReportPage from "./Sales";

const Sales = () => {
  return (
    <Suspense>
      <SalesReportPage />
    </Suspense>
  );
};

export default Sales;
