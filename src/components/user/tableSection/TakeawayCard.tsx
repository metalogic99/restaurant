"use client";
import { useRouter } from "next/navigation";
import { ObjectId } from "bson";
import { ShoppingBag, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TakeawayCard = () => {
  const router = useRouter();

  const handleStartOrder = () => {
    const generatedTableId = new ObjectId().toString();

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("takeawayTables") || "[]");
    const updated = [...existing, generatedTableId];
    localStorage.setItem("takeawayTables", JSON.stringify(updated));

    router.push(`/takeaway/${generatedTableId}`);
  };

  return (
    <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Takeaway Orders
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Quick service orders</p>
            </div>
          </div>

          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1"
          >
            Takeaway
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="flex gap-3">
          <Button
            size="lg"
            onClick={handleStartOrder}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start takeaway order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TakeawayCard;
