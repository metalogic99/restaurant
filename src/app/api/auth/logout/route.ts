import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: "Logout successful",
    },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    maxAge: 0, // expire immediately
    path: "/",
  });

  return response;
}
