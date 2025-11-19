import { authenticate } from "@/middleware/authentication";
import Order, { IOrder } from "@/models/orders.model";
import Product from "@/models/product.model";
import Table, { ITable } from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function calculateTotals(
  orderedProducts: any,
  overallDiscount = 0,
  isPercentage: boolean
) {
  let grossTotal = 0;
  let total = 0;
  for (const orderedProduct of orderedProducts) {
    const { product, quantity } = orderedProduct;
    const productGross = quantity * (await Product.findById(product)).price;

    grossTotal += productGross;
  }

  total = grossTotal - overallDiscount;
  if (isPercentage) {
    total = grossTotal - (overallDiscount / 100) * grossTotal;
    total = parseInt(total.toFixed(1));
  } else {
    total = grossTotal - overallDiscount;
  }
  return {
    grossTotal,
    total: total < 0 ? 0 : total,
  };
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "chef",
      "waiter",
      "receptionist",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { id: orderId } = params;
    const { data, status, discount, isPercentage, completeProduct } =
      await req.json();

    const isValidOrderId = mongoose.isValidObjectId(orderId);
    let invalidUpdate;
    if (!isValidOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid orderId",
        },
        { status: 400 }
      );
    }
    if (!data && !status && !discount && !completeProduct && !isPercentage) {
      return NextResponse.json(
        {
          success: false,
          message: "no data given to update",
        },
        { status: 400 }
      );
    }

    await connectDB();
    const order: IOrder | null = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "no order found for this order Id",
        },
        { status: 404 }
      );
    }
    if (completeProduct !== undefined) {
      order.orderedProducts = order.orderedProducts.map((orderedProduct) => {
        if (orderedProduct.product == completeProduct) {
          return { ...orderedProduct, status: "completed" };
        }
        return orderedProduct;
      });

      await order.save();
      return NextResponse.json(
        {
          success: true,
          message: "Product updated to completed",
        },
        { status: 200 }
      );
    }
    if (data !== undefined) {
      data.forEach((orderingProduct: any) => {
        let matched = false;
        if (orderingProduct.quantity < 0) {
          let cancelMatch = false;
          order.cancelledOrders = order.cancelledOrders.map((cancelled) => {
            if (cancelled.product == orderingProduct.productId) {
              cancelMatch = true;
              return {
                ...cancelled,
                quantity: cancelled.quantity + orderingProduct.quantity * -1,
              };
            }
            return cancelled;
          });
          if (!cancelMatch) {
            order.cancelledOrders.push({
              product: orderingProduct.productId,
              quantity: orderingProduct.quantity * -1,
            });
          }
        }
        order.orderedProducts = order.orderedProducts
          .map((ordered) => {
            if (
              ordered.product == orderingProduct.productId &&
              ((orderingProduct.quantity < 0 &&
                ordered.status !== "completed") ||
                ordered.status === "ordered")
            ) {
              matched = true;
              const updatedQuantity =
                ordered.quantity + orderingProduct.quantity;
              const notes = orderingProduct.notes;
              if (updatedQuantity > 0) {
                return {
                  ...ordered,
                  quantity: updatedQuantity,
                  notes: notes,
                };
              } else {
                return;
              }
            }

            return ordered;
          })
          .filter((product) => product !== undefined);
        if (!matched) {
          if (orderingProduct.quantity <= 0) {
            invalidUpdate = true;
          } else {
            order.orderedProducts.push({
              ...orderingProduct,
              product: orderingProduct.productId,
            });
          }
        }
      });
    }
    if (invalidUpdate) {
      return NextResponse.json({
        success: false,
        message: "Completed Product Quantity cannot be modified",
      });
    }

    order.isPercentage = isPercentage;
    const { grossTotal, total } = await calculateTotals(
      order.orderedProducts,
      discount,
      isPercentage ? isPercentage : order.isPercentage
    );
    order.grossTotal = grossTotal;
    order.total = total;
    order.discount = discount;
    if (status !== undefined) {
      order.status = status;
      await Table.findByIdAndUpdate(order.tableId, {
        $set: { status: "available", activeOrderId: null },
      });
    }
    await order.save();
    return NextResponse.json(
      {
        success: true,
        message: `${status ? `Order ${status}` : "Order updated"}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "waiter",
      "receptionist",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { id: tableId } = params;
    const { orderType, currentOrders, discount } = await req.json();
    console.log(currentOrders);
    if (!orderType || !tableId || !currentOrders) {
      return NextResponse.json(
        {
          success: false,
          message: "Requirements to order are not fulfilled",
        },
        { status: 400 }
      );
    }

    await connectDB();

    //  validate tableId
    const isValidTableId = mongoose.isValidObjectId(tableId);
    if (!isValidTableId) {
      return NextResponse.json(
        {
          success: false,
          message: "Table Id is not valid",
        },
        { status: 400 }
      );
    }
    const table: ITable | null = await Table.findById(tableId);
    if (!table) {
      await Order.create({
        orderType,
        orderedProducts: currentOrders.map((current: any) => ({
          product: current.productId,
          quantity: current.quantity,
          notes: current.notes,
          status: "ordered",
        })),
        tableId,
        status: "pending",
      });
      return NextResponse.json(
        {
          success: true,
          message:
            orderType === "takeaway"
              ? "Takeaway order created"
              : "Order created",
        },
        { status: 202 }
      );
    }
    const orderedProducts = currentOrders.map((current: any) => {
      return {
        product: current.productId,
        quantity: current.quantity,
        notes: current.notes,
        status: "ordered",
      };
    });
    const { grossTotal, total } = await calculateTotals(
      orderedProducts,
      discount,
      true
    );
    const order = await Order.create({
      orderType: orderType,
      orderedProducts,
      tableId: tableId,
      grossTotal,
      total,
      discount,
    });

    if (table.status !== "occupied") {
      table.status = "occupied";
      table.duration = new Date();
    }
    table.activeOrderId = order._id;
    await table.save();
    return NextResponse.json(
      {
        success: true,
        message: "Order created",
      },
      { status: 202 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side Error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "waiter",
      "receptionist",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { id: tableId } = params;
    if (!tableId) {
      return NextResponse.json(
        {
          success: false,
          message: "Table is not provided",
        },
        { status: 400 }
      );
    }
    const isValidTable = mongoose.isValidObjectId(tableId);
    if (!isValidTable) {
      return NextResponse.json(
        {
          success: false,
          message: "Not a valid table ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const order = await Order.findOne({ tableId, status: "pending" }).populate({
      path: "orderedProducts.product",
      model: Product,
    });

    return NextResponse.json({
      success: true,
      message: "ordered data of table",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side Error",
      },
      { status: 500 }
    );
  }
};
