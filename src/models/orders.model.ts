import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  orderType: string;
  tableId: mongoose.Types.ObjectId;
  orderedProducts: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    notes: string;
    status: string;
  }[];
  cancelledOrders: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  status: string;
  grossTotal: number;
  total: number;
  discount: number;
  name?: string;
}

const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["dineIn", "takeaway"],
      required: true,
      default: "dineIn",
    },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    orderedProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
        notes: { type: String },
        status: {
          type: String,
          enum: ["ordered", "completed"],
          default: "ordered",
        },
      },
    ],
    cancelledOrders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    grossTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
