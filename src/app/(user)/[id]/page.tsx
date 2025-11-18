import React from "react";
import { HandleOrder, ItemsSection } from "../(sections)";
import CommonSection from "@/components/shared/CommonSection";

const Order = ({ params }: { params: { id: string } }) => {
  const { id: tableId } = params;

  return (
    <CommonSection>
      <div className="w-full flex flex-col md:flex-row mt-10">
        <ItemsSection tableId={tableId} />
        <HandleOrder tableId={tableId} />
      </div>
    </CommonSection>
  );
};

export default Order;
