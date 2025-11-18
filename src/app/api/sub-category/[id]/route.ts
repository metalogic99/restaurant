import { authenticate } from "@/middleware/authentication";
import { SubCategory, Category } from "@/models/category.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authentication = await authenticate(req, ["admin", "chef"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const { name, parentCategory } = await req.json();
    const { id } = params;

    if (!name && !parentCategory) {
      return NextResponse.json(
        {
          error: "At least one field (name or parentCategory) must be provided",
        },
        { status: 400 }
      );
    }

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return NextResponse.json(
        { error: "SubCategory not found" },
        { status: 404 }
      );
    }

    // If parentCategory is updated, verify it exists and update references
    if (
      parentCategory &&
      parentCategory !== subCategory.parentCategory.toString()
    ) {
      const newParent = await Category.findById(parentCategory);
      if (!newParent) {
        return NextResponse.json(
          { error: "New parent category not found" },
          { status: 404 }
        );
      }

      // Remove subCategory ID from old parentCategory
      await Category.findByIdAndUpdate(subCategory.parentCategory, {
        $pull: { subCategories: subCategory._id },
      });

      // Add subCategory ID to new parentCategory
      await Category.findByIdAndUpdate(parentCategory, {
        $push: { subCategories: subCategory._id },
      });

      subCategory.parentCategory = parentCategory;
    }

    if (name) subCategory.name = name;

    await subCategory.save();

    return NextResponse.json(
      { success: "SubCategory updated", subCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SUBCATEGORY_PUT]", error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}

// DELETE subcategory by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const id = params.id?.trim();
    if (!id || id === "undefined") {
      return NextResponse.json(
        { error: "Invalid subcategory ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return NextResponse.json(
        { error: "SubCategory not found" },
        { status: 404 }
      );
    }

    await Category.findByIdAndUpdate(subCategory.parentCategory, {
      $pull: { subCategories: subCategory._id },
    });

    await SubCategory.findByIdAndDelete(id);

    return NextResponse.json(
      { success: "SubCategory deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SUBCATEGORY_DELETE]", error);
    return NextResponse.json({ error: "Server side error" }, { status: 500 });
  }
}
