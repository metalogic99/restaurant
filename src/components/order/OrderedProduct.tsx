import { useUpdateOrder } from "@/hooks/order.hooks";
import { Check, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useSocket } from "../providers/SocketProvider";

const OrderedProduct = ({
  orderId,
  tableId,
  orderedProduct,
  tableName,
}: {
  orderId: string;
  tableId: string;
  orderedProduct: any;
  tableName: string;
}) => {
  const socket = useSocket();
  const isCompleted = orderedProduct.status === "completed";
  const { mutate: completeProduct } = useUpdateOrder(tableId);

  const handleProductCompleted = () => {
    console.log(orderedProduct.product._id);
    completeProduct(
      { orderId: orderId, productCompleted: orderedProduct.product._id },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          if (socket && socket.connected) {
            const formattedTime = new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            console.log("line-35, emiting socket");
            socket.emit("productCompleted", {
              message: `${orderedProduct.product.name} ready of table ${tableName}`,
              time: formattedTime,
            });
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div
      className={`bg-white rounded-lg border-2 p-2 shadow-sm transition-all duration-200 ${
        isCompleted
          ? "border-green-200 bg-green-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-1 space-y-1">
            <h3
              className={`font-semibold text-lg ${
                isCompleted ? "text-green-800 line-through" : "text-gray-800"
              }`}
            >
              <p className="flex items-center">
                <span className="flex items-center">
                  {orderedProduct.product.name} <X size={16} />
                </span>
                <span
                  className={`font-semibold ${
                    isCompleted ? "text-forestGreen" : "text-gray-800"
                  }`}
                >
                  {orderedProduct.quantity}
                </span>
              </p>
            </h3>

            {orderedProduct.notes && (
              <div className="bg-gray-50 p-1 w-full rounded-md border-l-4 border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Note:</span>{" "}
                  {orderedProduct.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          disabled={isCompleted}
          onClick={handleProductCompleted}
          className={`ml-4 px-2 py-1 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            isCompleted
              ? "bg-forestGreen text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isCompleted ? "Completed" : "Complete"}</span>
        </button>
      </div>
    </div>
  );
};

export default OrderedProduct;
