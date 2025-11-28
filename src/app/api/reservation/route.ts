import { authenticate } from "@/middleware/authentication";
import Reservation from "@/models/reservation.model";
import Table from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
function convertTo24HourDate(dateString: string, time12h: string) {
  const [time, meridian] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  minutes = minutes || 0;

  const date = new Date(dateString);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export async function POST(req: NextRequest) {
  try {
    const { name, time, date, peopleNos, phone, tableId, preOrdered } =
      await req.json();
    if (!name || !time || !date || !peopleNos || !phone || !tableId) {
      return NextResponse.json(
        {
          error:
            "Bad request, name, time, date, peopleNos, tableId and phone are required",
        },
        { status: 400 }
      );
    }
    const targetTime = convertTo24HourDate(date, time);

    await connectDB();
    const fifteenMin = 15 * 60 * 1000;

    const startTime = new Date(targetTime.getTime() - fifteenMin);
    const endTime = new Date(targetTime.getTime() + fifteenMin);

    const reservations = await Reservation.find({
      date,
      tableId,
      time: { $gte: startTime, $lte: endTime },
    });
    console.log("reservation obtained is", reservations);
    if (reservations.length > 0) {
      return NextResponse.json(
        {
          error: "Reservation already exists for that time period",
        },
        { status: 409 }
      );
    }

    const isvalidId = mongoose.isValidObjectId(tableId);
    if (!isvalidId) {
      return NextResponse.json({ error: "Invalid Table Id" }, { status: 400 });
    }

    const table = await Table.findById(tableId);
    if (!table) {
      return NextResponse.json(
        {
          error: "Table Id not found",
        },
        { status: 404 }
      );
    }

    const reservationCreated = new Reservation({
      name,
      time: targetTime,
      date: new Date(date),
      peopleNos,
      phone,
      table,
      preOrdered,
    });
    await reservationCreated.save();
    return NextResponse.json(
      { success: true, reservationCreated },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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

    const { date, tableId } = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );

    const filter: any = {};

    if (tableId && tableId !== "undefined") {
      filter.table = tableId;
    }

    if (date && date !== "undefined") {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filter.time = { $gte: startOfDay, $lte: endOfDay };
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

