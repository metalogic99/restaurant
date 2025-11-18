import axios from "axios";
import { ObjectId } from "bson";

type OrderItem = {
  productId: string;
  quantity: number;
  notes?: string;
};

export const submitOrder = async ({
  orderType,
  currentOrders,
  dineInTableId,
}: {
  orderType: "takeaway" | "dine-in";
  currentOrders: OrderItem[];
  dineInTableId?: string;
}) => {
  const tableId =
    orderType === "takeaway"
      ? new ObjectId().toHexString() // Generate new tableId for takeaway
      : dineInTableId;

  if (!tableId || currentOrders.length === 0) {
    throw new Error("Missing tableId or orders");
  }

  const response = await axios.post(`/api/order/${tableId}`, {
    orderType,
    currentOrders,
  });

  return response.data;
};
