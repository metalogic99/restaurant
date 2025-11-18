import User from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { authenticate } from "@/middleware/authentication";

export async function POST(req: NextRequest) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();

    const { fullName, password, role, userName } = await req.json();

    // Validate input
    if (!fullName || !password || !role || !userName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate role enum
    const allowedRoles = ["waiter", "receptionist", "chef", "admin"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this name already exists" },
        { status: 409 }
      );
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      userName,
      password: hashedPassword,
      role,
    });

    // Return success response
    return NextResponse.json(
      {
        success: "User is created",
        user: {
          _id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();

    const users = await User.find().select("-password");

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
