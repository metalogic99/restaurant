import React from "react";
import { HandleOrder, ItemsSection } from "../../(sections)";

interface TakeawayPageProps {
  params: {
    id: string;
  };
}

const TakeawayOrderIdPage = ({ params }: TakeawayPageProps) => {
  return (
    <div className="min-h-screen bg-white p-6 ">
      <h1 className="text-2xl font-bold text-orange-600 mb-4 text-center">
        Takeaway Order
      </h1>
      <div className="flex">
        <ItemsSection tableId={params.id} />
        <HandleOrder tableId={params.id} isTakeaway={true} />
      </div>
    </div>
  );
};

export default TakeawayOrderIdPage;
