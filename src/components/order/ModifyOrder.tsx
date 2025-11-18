import { useUpdateOrder } from "@/hooks/order.hooks";
import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useSocket } from "../providers/SocketProvider";

const ModifyOrder = ({
  productDescription,
  onClose,
  tableId,
  orderId,
}: {
  productDescription: any;
  onClose: any;
  tableId: string;
  orderId: string;
}) => {
  const socket = useSocket();
  const { mutate: updateOrder, isPending: updatePending } =
    useUpdateOrder(tableId);

  const [updatedQuantity, setUpdatedQuantity] = useState<number>(
    productDescription.product.quantity
  );
  const [notes, setNotes] = useState<string>(productDescription.product.notes);

  const updateClickHandler = () => {
    const changedQuantity =
      updatedQuantity - productDescription.product.quantity;
    console.log("changed quantity", changedQuantity);
    console.log("type is", productDescription.type);
    if (productDescription.type === "ordered") {
      const updateOrderData = [
        {
          productId: productDescription.product.product._id,
          quantity: changedQuantity,
          notes: notes,
        },
      ];
      console.log("line 40", updateOrderData);
      updateOrder(
        {
          orderId: orderId,
          updateData: updateOrderData,
        },
        {
          onSuccess: (data) => {
            toast.error(data.message);
            if (socket && socket.connected) {
              console.log("updating order through socket alsod");
              socket.emit("updateOrder", tableId);
            }
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      const currentProduct = JSON.parse(
        localStorage.getItem(tableId) as string
      );
      const thisProduct = currentProduct.find(
        (current: any) =>
          current.product._id === productDescription.product.product._id
      );
      thisProduct.quantity = thisProduct.quantity + changedQuantity;
      thisProduct.notes = notes;
      let updatedProducts;
      if (thisProduct.quantity === 0) {
        updatedProducts = currentProduct.filter((product: any) => {
          return product.product._id !== thisProduct.product._id;
        });
      } else {
        updatedProducts = currentProduct.map((product: any) => {
          if (product.product._id === thisProduct.product._id) {
            return thisProduct;
          }
          return product;
        });
      }

      localStorage.setItem(tableId, JSON.stringify(updatedProducts));
      window.dispatchEvent(new Event("local-storage-change"));
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">
              {productDescription.product.product.name}
            </h3>
            <p className="text-sm text-gray-600">
              Rs. {productDescription.product.product.price} per item
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setUpdatedQuantity((prev) => {
                    if (prev === 0) {
                      return prev;
                    } else {
                      return prev - 1;
                    }
                  })
                }
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>

              <input
                type="number"
                value={updatedQuantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setUpdatedQuantity(value);
                }}
                className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />

              <button
                onClick={() => setUpdatedQuantity((prev) => prev + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={updateClickHandler}
            className="flex-1 px-4 py-2 bg-forestGreen text-white rounded-lg hover:bg-forestGreen/90 transition-colors font-medium"
          >
            {updatePending ? "Updating....." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyOrder;
