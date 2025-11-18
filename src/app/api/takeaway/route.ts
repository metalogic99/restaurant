import { authenticate } from "@/middleware/authentication";
import Order, { IOrder } from "@/models/orders.model";
import Product from "@/models/product.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "waiter",
      "receptionist",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const takeaways: IOrder[] = await Order.find({
      orderType: "takeaway",
      status: "pending",
    }).populate({
      path: "orderedProducts.product",
      model: Product,
    });
    console.log("line 16- takeaway route", takeaways);
    return NextResponse.json(
      {
        success: true,
        message: "All takeaways",
        takeaways,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side Error",
      },
      { status: 500 }
    );
  }
};
