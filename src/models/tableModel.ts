import mongoose from "mongoose";

export interface ITable extends mongoose.Document {
  tableName: string;
  status: string;
  duration: Date;
  activeOrderId: string;
}

const tableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  status: {
    type: String,
    enum: ["occupied", "available"],
    default: "available",
  },
  duration: { type: String },
  activeOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default Table;
