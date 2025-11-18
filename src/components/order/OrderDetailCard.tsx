import React from "react";
import OrderedProduct from "./OrderedProduct";

const OrderDetailCard = ({ order }: { order: any }) => {
  return (
    <div className="flex flex-col gap-1 border border-black rounded-lg p-1">
      <span>
        Table:
        <span className="font-semibold">
          {order.tableId ? order.tableId?.tableName : "Takeaway"}
        </span>
      </span>
      {order.orderedProducts.map((orderedProduct: any) => (
        <OrderedProduct
          tableId={order.tableId ? order.tableId._id : order.tableId}
          orderId={order._id}
          orderedProduct={orderedProduct}
          key={orderedProduct._id}
          tableName={order.tableId ? order.tableId?.tableName : "Takeaway"}
        />
      ))}
    </div>
  );
};

export default OrderDetailCard;
