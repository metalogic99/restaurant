import { authenticate } from "@/middleware/authentication";
import Order from "@/models/orders.model";
import Product from "@/models/product.model";
import Table from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   try {
//     const authentication = await authenticate(req, [
//       "admin",
//       "chef",
//       "waiter",
//       "receptionist",
//     ]);
//     if (!authentication.success) {
//       return NextResponse.json(authentication, { status: 401 });
//     }

//     const searchParams = req.nextUrl.searchParams;
//     const status = searchParams.get("status");
//     const date = searchParams.get("date");

//     if (!status) {
//       return NextResponse.json(
//         { success: false, message: "Status is not provided" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const query: any = {};

//     if (status !== "all") {
//       query.status = status;
//     }

//     if (date === "today") {
//       const start = new Date();
//       start.setHours(0, 0, 0, 0);
//       const end = new Date();
//       end.setHours(23, 59, 59, 999);

//       query.createdAt = {
//         $gte: start,
//         $lte: end,
//       };
//     }

//     const orders = await Order.find(query)
//       .populate({ path: "orderedProducts.product", model: Product })
//       .populate({ path: "tableId", model: Table });

//     return NextResponse.json({
//       success: true,
//       message: "Order data fetched",
//       data: orders,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { success: false, message: "Server Side Error" },
//       { status: 500 }
//     );
//   }
// };

export const GET = async (req: NextRequest) => {
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

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status"); // "pending", "completed", etc. or "all"
    const date = searchParams.get("date"); // "today", "weekly", etc.
    const from = searchParams.get("from"); // for custom range
    const to = searchParams.get("to");

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is not provided" },
        { status: 400 }
      );
    }

    await connectDB();

    const query: any = {};

    // Filter by status unless it's 'all'
    if (status !== "all") {
      query.status = status;
    }

    // Filter by date ranges
    if (date) {
      const now = new Date();
      let startDate: Date | undefined;
      let endDate: Date | undefined;

      switch (date) {
        case "today":
          startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
          break;

        case "weekly":
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
          break;

        case "monthly":
          startDate = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
            0,
            0,
            0,
            0
          );
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
          break;

        case "yearly":
          startDate = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0,
            0
          );
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
          break;

        case "custom":
          if (from && to) {
            startDate = new Date(from);
            endDate = new Date(to);
            endDate.setHours(23, 59, 59, 999);
          } else {
            return NextResponse.json(
              {
                success: false,
                message:
                  "Custom date range requires both 'from' and 'to' dates",
              },
              { status: 400 }
            );
          }
          break;

        default:
          break;
      }

      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lte: endDate };
      }
    }

    const orders = await Order.find(query)
      .populate({ path: "orderedProducts.product", model: Product })
      .populate({ path: "tableId", model: Table });

    return NextResponse.json({
      success: true,
      message: "Order data fetched",
      data: orders,
    });
  } catch (error) {
    console.log(" error:", error);
    return NextResponse.json(
      { success: false, message: "Server Side Error" },
      { status: 500 }
    );
  }
};
