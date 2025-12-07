import { authenticate } from "@/middleware/authentication";
import Product from "@/models/product.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await authenticate(req, ["admin"]);
    if (!auth.success) {
      return NextResponse.json(auth, { status: 401 });
    }

    await connectDB();

    const { id } = params;
    const { rank: newRank } = await req.json();

    if (newRank == null) {
      return NextResponse.json({ error: "Rank is required" }, { status: 400 });
    }

    // Find the product being moved
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const oldRank = product.rank;
    const subcategoryId = product.subcategory;

    const allProducts = await Product.find({ subcategory: subcategoryId });
    const maxRank = allProducts.length;

    if (newRank < 1 || newRank > maxRank) {
      return NextResponse.json(
        { error: `Rank should be between 1 and ${maxRank}` },
        { status: 400 }
      );
    }

    if (newRank < oldRank) {
      // Moving product UP
      await Product.updateMany(
        {
          subcategory: subcategoryId,
          rank: { $gte: newRank, $lt: oldRank },
          _id: { $ne: id },
        },
        { $inc: { rank: 1 } }
      );
    } else if (newRank > oldRank) {
      // Moving product DOWN
      await Product.updateMany(
        {
          subcategory: subcategoryId,
          rank: { $gt: oldRank, $lte: newRank },
          _id: { $ne: id },
        },
        { $inc: { rank: -1 } }
      );
    }

    product.rank = newRank;
    await product.save();

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error reordering products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
