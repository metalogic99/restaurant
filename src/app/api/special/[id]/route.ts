import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { authenticate } from "@/middleware/authentication";
import Special, { ISpecial } from "@/models/special.model";
import connectDB from "@/utils/connectDB";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

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
    const todaySpecial = await Special.findByIdAndDelete(params.id.trim());
    if (!todaySpecial) {
      return NextResponse.json(
        { error: "Today Special not found" },
        { status: 404 }
      );
    }

    //delete from cloudinary
    if (todaySpecial.publicId) {
      await deleteFromCloudinary(todaySpecial.publicId);
    }
    await Special.findByIdAndDelete(params.id.trim());

    return NextResponse.json(
      { success: "Today Special deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Server error while deleting today special" },
      { status: 500 }
    );
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const entryImage = formData.get("image");
  const { id: specialId } = params;
  try {
    await connectDB();
    if (!name || !price) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and price is required",
        },
        { status: 400 }
      );
    }
    const isValidId = mongoose.isValidObjectId(specialId);
    if (!isValidId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not valid special Id",
        },
        { status: 400 }
      );
    }
    const special: ISpecial | null = await Special.findById(specialId);
    if (!special) {
      return NextResponse.json(
        {
          success: false,
          message: "Today's Special doesn't Exist",
        },
        { status: 404 }
      );
    }
    const image: File | null = entryImage instanceof File ? entryImage : null;
    if (!image) {
      special.name = name as string;
      special.price = Number(price);
      special.description = description as string;
      await special.save();
    } else {
      try {
        const cloudinaryResponse = await uploadToCloudinary(image, "special");
        let cloudinaryDeleteResponse;
        try {
          cloudinaryDeleteResponse = await deleteFromCloudinary(
            special.publicId
          );
        } catch (err) {
          console.warn("Cloudinary deletion error:", err);
        }
        special.name = name as string;
        special.price = Number(price);
        special.description = description as string;
        special.image = cloudinaryResponse.secure_url;
        special.publicId = cloudinaryResponse.public_id;
        await special.save();
        if (
          !cloudinaryDeleteResponse ||
          cloudinaryDeleteResponse.result !== "ok"
        ) {
          return NextResponse.json(
            {
              success: true,
              message: "Update successful without deletion from cloudinary",
            },
            { status: 200 }
          );
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload Image, try again",
          },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(
      {
        success: true,
        message: "Today's special Update Successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side Error",
      },
      { status: 500 }
    );
  }
};
