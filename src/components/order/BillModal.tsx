import { useUpdateOrder } from "@/hooks/order.hooks";
import React from "react";
import { toast } from "sonner";
import { useSocket } from "../providers/SocketProvider";
import { useRouter } from "next/navigation";

interface BillModalProps {
  onClose: () => void;
  order: Order;
}

const BillModal = ({ onClose, order }: BillModalProps) => {
  const socket = useSocket();
  const router = useRouter();
  const { mutate: updateOrder } = useUpdateOrder(order.tableId);
  console.log("orders in bill are", order);
  const handlePrint = () => {
    if (localStorage.getItem(order.tableId)) {
      toast.error("Cant finish payment while adding products");
      return;
    }
    updateOrder(
      { orderId: order._id, status: "completed" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          if (socket && socket.connected) {
            socket.emit("clearOrders");
          }
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error.message);
        },
      }
    );
  };

  return (
    <div className="fixed h-screen w-screen inset-0 z-51 bg-black/50">
      <div className="fixed top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-50 bg-white rounded-lg shadow-xl max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-1 px-6">
          <div className="text-center mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Restaurant Name</h3>
            <p className="text-sm text-gray-600">Address, location-7</p>

            <p className="text-sm text-gray-600">Tel: +977-9841625255</p>

            <p className="text-sm text-gray-600 mt-2">2080-09-06 11:09:45</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium text-gray-700">Table:</span>
              <span className="text-sm text-gray-900">T1</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium text-gray-700">
                Order Ref:
              </span>
              <span className="text-sm text-gray-900">a278c3039399c33b9</span>
            </div>
          </div>

          <div className="mb-6">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-300 font-medium">
                  <th className="text-left w-5/12 py-2">Item</th>
                  <th className="text-center w-2/12 py-2">Qty</th>
                  <th className="text-right w-2/12 py-2">Price</th>
                  <th className="text-right w-3/12 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderedProducts.map((ordered) => {
                  return (
                    <tr
                      key={ordered._id}
                      className="border-b border-gray-100 text-gray-900"
                    >
                      <td className="text-left py-2">{ordered.product.name}</td>
                      <td className="text-center py-2">{ordered.quantity}</td>
                      <td className="text-right py-2">
                        {ordered.product.price}
                      </td>
                      <td className="text-right py-2">
                        {ordered.quantity * ordered.product.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mb-6 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center font-bold text">
              <span className="text-gray-800">Gross total:</span>
              <span className="text-gray-900">{order.grossTotal}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span className=" text-mintGreen">Discount:</span>
              <span className="text-mintGreen">{order.discount}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span className="text-gray-800">Total:</span>
              <span className="text-gray-900">{order.total}</span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-base font-medium text-blue-800 mb-3">
              Order Information
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-blue-800 min-w-[80px]">
                  Order Id:
                </span>
                <span className="text-sm text-gray-900 font-mono break-all flex-1 text-right">
                  a278c3039399c33b9
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
            <p>
              Thank you for dining with us! We hope to serve you again soon.{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            className="px-4 py-2 bg-buttonColor text-white rounded-md hover:bg-buttonColor/90 transition-colors"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
