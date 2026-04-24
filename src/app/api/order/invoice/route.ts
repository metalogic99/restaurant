import Order from "@/models/orders.model";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await connectDB();
    const lastOrder = await Order.findOne().sort({ invoice: -1 });

    const lastInvoice = lastOrder
      ? lastOrder.invoice
        ? lastOrder.invoice
        : 0
      : 0;

    const newInvoice = lastInvoice + 1;

    return NextResponse.json({
      success: true,
      message: "Invoice data fetched",
      data: newInvoice,
    });
  } catch (error) {
    console.log(" error:", error);
    return NextResponse.json(
      { success: false, message: "Server Side Error" },
      { status: 500 },
    );
  }
};
