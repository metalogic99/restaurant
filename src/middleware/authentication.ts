import { JWTPayload, jwtVerify } from "jose";
import { NextRequest } from "next/server";
const JWT = process.env.JWT_SECRET;
if (!JWT) {
  throw new Error("JWT not defined in env");
}
export const authenticate = async (
  req: NextRequest,
  roles: string[]
): Promise<{ success: boolean; message?: string; data?: JWTPayload }> => {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return {
      success: false,
      message: "Unauthorize Access",
    };
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT));
  if (!payload) {
    return {
      success: false,
      message: "Invalid or Expired token",
    };
  }
  const currentRole = payload?.role;
  if (roles) {
    const authorized = roles.includes(currentRole as string);
    if (!authorized) {
      return {
        success: false,
        message: "Unauthorized access",
      };
    }
  }
  return {
    success: true,
    data: payload,
  };
};
