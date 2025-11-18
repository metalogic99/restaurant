import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log("Data base connection successful");
  } catch (error) {
    console.log("Database connection failure", error);
  }
};

export default connectDB;
