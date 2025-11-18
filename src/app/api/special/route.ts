import { uploadToCloudinary } from "@/lib/cloudinary";
import Special from "@/models/special.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const entryImage = formData.get("image");

  try {
    if (!name || !price) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and price is required",
        },
        { status: 400 }
      );
    }
    const image: File | null = entryImage instanceof File ? entryImage : null;
    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image ",
        },
        { status: 400 }
      );
    }
    try {
      await connectDB();
      const cloudinaryResponse = await uploadToCloudinary(image, "special");
      await Special.create({
        name: name,
        description: description,
        price: price,
        image: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id,
      });
      return NextResponse.json(
        {
          success: true,
          message: "Today's special added",
        },
        { status: 201 }
      );
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

export const GET = async () => {
  try {
    await connectDB();
    const specials = await Special.find();
    return NextResponse.json({
      specials: specials,
      success: true,
      message: "All specials",
    });
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
