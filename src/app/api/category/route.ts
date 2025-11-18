import { authenticate } from "@/middleware/authentication";
import { Category, SubCategory } from "@/models/category.model";
import Product from "@/models/product.model";
import connectDB from "@/utils/connectDB";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          error: "Category name is required",
        },
        { status: 500 }
      );
    }

    const category = await new Category({ name });

    await category.save();
    return NextResponse.json(
      { success: "Category name is created", category },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // const authentication = await authenticate(req, ["admin", "waiter", "reception"]);
    // if (!authentication.success) {
    //   return NextResponse.json(authentication, { status: 401 });
    // }
    await connectDB();
    const categories = await Category.find().populate({
      path: "subCategories",
      model: SubCategory,
      populate: {
        path: "products",
        model: Product,
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}
