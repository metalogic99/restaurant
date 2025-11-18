import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product.model";
import { SubCategory } from "@/models/category.model";
import connectDB from "@/utils/connectDB";
import { authenticate } from "@/middleware/authentication";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authentication = await authenticate(req, ["admin","chef"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { id } = params;
    const { name, price, description, subcategory } = await req.json();

    // Validation
    if (!name || !price || !description || !subcategory) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if subcategory exists
    const subcategoryExists = await SubCategory.findById(subcategory);
    if (!subcategoryExists) {
      return NextResponse.json(
        { error: "Invalid subcategory ID" },
        { status: 400 }
      );
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, subcategory },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Product deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
