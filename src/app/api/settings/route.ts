import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Settings from "@/models/settings.model";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const displayName = formData.get("displayName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const location = formData.get("location") as string;
    const logoFile = formData.get("logo") as File | null;

    if (!displayName || !phoneNumber || !location) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    // Check if settings already exist
    const existingSettings = await Settings.findOne();
    if (existingSettings) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings already exist. Use update route.",
        },
        { status: 409 }
      );
    }

    // Handle logo upload if file exists
    let logoUrl = "";
    if (logoFile && logoFile.size > 0) {
      const result = await uploadToCloudinary(logoFile, "settings/logos");
      logoUrl = result.secure_url;
    }

    // Create new settings
    const newSettings = await Settings.create({
      displayName,
      phoneNumber,
      location,
      logo: logoUrl,
    });

    return NextResponse.json(
      { success: true, data: newSettings },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const settings = await Settings.findOne();
    return NextResponse.json(
      { success: true, data: settings || null },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();

    const displayName = formData.get("displayName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const location = formData.get("location") as string;
    const logoFile = formData.get("logo") as File | null;

    if (!displayName || !phoneNumber || !location) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    let settings = await Settings.findOne();
    let logoUrl = settings?.logo || "";

    // Handle logo upload/removal
    if (logoFile && logoFile.size > 0) {
      const result = await uploadToCloudinary(logoFile, "settings/logos");
      logoUrl = result.secure_url;
    } else if (formData.get("logo") === "") {
      logoUrl = "";
    }

    if (settings) {
      settings.displayName = displayName;
      settings.phoneNumber = phoneNumber;
      settings.location = location;
      settings.logo = logoUrl;
      await settings.save();
    } else {
      settings = await Settings.create({
        displayName,
        phoneNumber,
        location,
        logo: logoUrl,
      });
    }

    return NextResponse.json(
      { success: true, data: settings },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
};
