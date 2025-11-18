import mongoose from "mongoose";

export interface ISpecial extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image: string;
  publicId: string;
}

const specialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  publicId: { type: String, required: true },
});

const Special =
  mongoose.models.Special || mongoose.model("Special", specialSchema);
export default Special;
