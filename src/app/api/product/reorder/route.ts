import Product from "@/models/product.model";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function PATCH() {
  try {
    await connectDB();

    const products = await Product.find().sort({ subcategory: 1, _id: 1 });

    if (!products.length) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    let currentSub: any = null;
    let rank = 0;

    const bulkOps: any[] = [];

    products.forEach((p) => {
      const sub = p.subcategory.toString();

      if (currentSub !== sub) {
        currentSub = sub;
        rank = 1;
      } else {
        rank++;
      }

      bulkOps.push({
        updateOne: {
          filter: { _id: p._id },
          update: { $set: { rank: rank } },
        },
      });
    });

    await Product.bulkWrite(bulkOps);

    return NextResponse.json(
      { success: true, message: "Ranks updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordering products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
