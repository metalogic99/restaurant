import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    time: { type: Date, required: true },
    date: { type: Date, required: true },
    peopleNos: { type: Number, required: true },
    phone: { type: String, required: true },
    preOrdered: { type: Boolean, default: true },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
export default Reservation;
