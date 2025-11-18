"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET;

export const getUser = async () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    console.log("no token so in login page");
    return;
  }
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  if (!payload) {
    throw new Error("no payload to decide role");
  }
  return payload;
};
