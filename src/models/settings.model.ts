import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true },
    logo: { type: String },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Settings =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Settings;
