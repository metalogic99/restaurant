import Image from "next/image";
import React from "react";

const TableLayout = () => {
  return (
    <div className="w-full mt-10">
      <Image
        src="/guest/reservation/layout.png"
        alt="table layout"
        height={600}
        width={600}
        className="object-cover w-full"
      />
    </div>
  );
};

export default TableLayout;
