import jwt from "jsonwebtoken";

const JWT = process.env.JWT_SECRET;
if (!JWT) {
  throw new Error("JWT not defined in env");
}
export const jwtSign = (payload: Payload) => {
  return jwt.sign(payload, JWT, { expiresIn: "24h" });
};
