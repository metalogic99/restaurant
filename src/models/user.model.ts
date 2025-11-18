import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["waiter", "receptionist", "chef", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
