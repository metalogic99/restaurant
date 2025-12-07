import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  rank: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
