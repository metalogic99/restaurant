import { authenticate } from "@/middleware/authentication";
import Order from "@/models/orders.model";
import Product from "@/models/product.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { searchParams } = req.nextUrl;
    const pageString = searchParams.get("page");
    const orderType = searchParams.get("orderType");
    const time = searchParams.get("time");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const status = searchParams.get("status");

    const page = Number(pageString ?? "1") - 1;
    let filter = {};
    if (orderType && orderType !== "allType") {
      filter = { ...filter, orderType: orderType };
    }
    if (status && status !== "allStatus") {
      filter = { ...filter, status: status };
    }
    const now = new Date();
    if (time && time !== "allTime") {
      let startDate: Date;
      let endDate = now;

      switch (time) {
        case "today":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "weekly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate() - 7,
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "monthly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth() - 1,
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "yearly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear() - 1,
              now.getUTCMonth(),
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;
        case "custom":
          console.log("from and to are as", from, to);
          if (from && to) {
            startDate = new Date(from);
            endDate = new Date(to);
            endDate.setHours(23, 59, 59, 999);
          } else {
            return NextResponse.json(
              {
                success: false,
                message: "Missing 'from' or 'to' for custom time filter",
              },
              { status: 400 }
            );
          }
          break;

        default:
          startDate = undefined!;
          endDate = undefined!;
      }

      if (startDate && endDate) {
        filter = { ...filter, createdAt: { $gte: startDate, $lte: endDate } };
      }
    }
    console.log("filter for the order is", filter);

    await connectDB();
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * 20)
      .limit(20)
      .populate({
        path: "orderedProducts.product",
        model: Product,
      })
      .populate({
        path: "cancelledOrders.product",
        model: Product,
      });
    let totalRevenue = 0;
    let cancelledOrders = 0;
    let totalFilteredOrders = 0;
    if (page === 0) {
      totalFilteredOrders = await Order.countDocuments(filter);
      const allFilteredOrders = await Order.find(filter);
      allFilteredOrders.forEach((order) => {
        if (order.status !== "cancelled") {
          totalRevenue += order.total;
        } else {
          cancelledOrders += 1;
        }
      });
    }
    return NextResponse.json({
      success: true,
      message: "All orders",
      data: { orders, totalRevenue, totalFilteredOrders, cancelledOrders },
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
