"use client";
import { Card } from "@/components/ui/card";
import TakeawayCard from "@/components/user/tableSection/TakeawayCard";
import TakeawayOrderView from "@/components/user/tableSection/ViewTakeaway";
import React from "react";

const TakewayPage = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Takeaway Orders
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="p-6 rounded-xl border border-gray-200">
              <TakeawayCard />
            </Card>
          </div>
          <div>
            <Card className="p-6 rounded-xl border border-gray-200">
              <TakeawayOrderView />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakewayPage;
