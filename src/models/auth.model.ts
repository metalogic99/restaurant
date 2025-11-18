import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["chef", "waiter", "admin", "receptionist"],
      required: true,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);
export default Auth;
