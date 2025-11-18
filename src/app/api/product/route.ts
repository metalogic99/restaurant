import Product from "@/models/product.model";
import { SubCategory } from "@/models/category.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/middleware/authentication";

export async function POST(req: NextRequest) {
  try {
    const authentication = await authenticate(req, ["admin", "chef"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { name, price, description, subcategory } = await req.json();

    if (!name || !price || !description || !subcategory) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate subcategory exists
    const subcategoryObject = await SubCategory.findById(subcategory);
    if (!subcategoryObject) {
      return NextResponse.json(
        { error: "Invalid subcategory ID" },
        { status: 400 }
      );
    }

    const product = new Product({
      name,
      price,
      description,
      subcategory,
    });

    await product.save();
    subcategoryObject.products.push(product._id);
    await subcategoryObject.save();
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
    await connectDB();
    const products = await Product.find().populate("subcategory", "name");
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
