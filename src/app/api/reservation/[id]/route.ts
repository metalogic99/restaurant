import { authenticate } from "@/middleware/authentication";
import Reservation from "@/models/reservation.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectDB();

    const authenticationResponse = await authenticate(req, ["admin"]);

    if (!authenticationResponse.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }

    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedReservation });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
