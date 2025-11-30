// export const dynamic = "force-dynamic";

import { authenticate } from "@/middleware/authentication";
import Reservation from "@/models/reservation.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authenticationResponse = await authenticate(req, [
      "admin",
      "receptionist",
      "waiter",
    ]);

    if (!authenticationResponse.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { search } = Object.fromEntries(req.nextUrl.searchParams.entries());

    const filter: any = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    if (!search || search === "today") {
      filter.time = { $gte: today, $lte: endToday };
    } else if (search === "past") {
      filter.time = { $lt: today };
    } else if (search === "upcoming") {
      filter.time = { $gt: endToday };
    } else {
      filter.time = { $gte: today, $lte: endToday };
    }

    const reservations = await Reservation.find(filter)
      .populate("table")
      .sort({ time: 1 });

    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
