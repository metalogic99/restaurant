"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUser() {
  const cookie = cookies().get("token");

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(JWT_SECRET)
    );

    return payload;
  } catch (err) {
    console.error("JWT error:", err);
    return null;
  }
}
