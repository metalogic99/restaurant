import User from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { jwtSign } from "@/utils/jwtFunc";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userName, password } = await req.json();
  if (!userName || !password) {
    return NextResponse.json({
      success: false,
      message: "All fields are Required",
    });
  }
  try {
    await connectDB();
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials hh",
        },
        { status: 401 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }
    const payload = {
      username: user.userName,
      role: user.role,
    };
    const token = jwtSign(payload);
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side error",
      },
      { status: 500 }
    );
  }
};
