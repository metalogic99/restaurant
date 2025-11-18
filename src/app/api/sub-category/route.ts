import { NextRequest, NextResponse } from "next/server";
import { SubCategory, Category } from "@/models/category.model";
import connectDB from "@/utils/connectDB";
import { authenticate } from "@/middleware/authentication";

export async function POST(req: NextRequest) {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "chef",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { name, parentCategory } = await req.json();

    if (!name || !parentCategory) {
      return NextResponse.json(
        { error: "Name and parentCategory are required" },
        { status: 400 }
      );
    }

    const categoryExists = await Category.findById(parentCategory);
    if (!categoryExists) {
      return NextResponse.json(
        { error: "Parent category not found" },
        { status: 404 }
      );
    }

    const subCategory = new SubCategory({ name, parentCategory });
    await subCategory.save();

    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategories: subCategory._id },
    });

    return NextResponse.json(
      { success: "SubCategory created", subCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SUBCATEGORY_POST]", error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authentication = await authenticate(req, ["admin", "chef"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const subCategories = await SubCategory.find().populate(
      "parentCategory",
      "name"
    );
    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
    console.error("[SUBCATEGORY_GET]", error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}
