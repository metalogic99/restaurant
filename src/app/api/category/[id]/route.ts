import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { Category } from "@/models/category.model";
import { authenticate } from "@/middleware/authentication";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authentication = await authenticate(req, ["admin"]);
  if (!authentication.success) {
    return NextResponse.json(authentication, { status: 401 });
  }
  try {
    await connectDB();
    const { name } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "Category updated successfully", category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error while updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const category = await Category.findByIdAndDelete(params.id.trim());
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Server error while deleting category" },
      { status: 500 }
    );
  }
}
