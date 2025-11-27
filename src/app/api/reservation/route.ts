import { authenticate } from "@/middleware/authentication";
import Reservation from "@/models/reservation.model";
import Table from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

function convertTo24Hour(time12h: string) {
  const [time, meridian] = time12h.split(" ");
  let hour = Number(time.split(":")[0]);
  const minute = Number(time.split(":").pop());

  if (meridian === "PM" && hour !== 12) hour += 1;
  if (meridian === "AM" && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
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
    const twentyFourHourTime = convertTo24Hour(time);
    await connectDB();
    const targetTime = new Date(`${date}T${twentyFourHourTime}:00`);
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
      time: targetTime.getTime(),
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
    await authenticate(req, ["admin"]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to reservations" },
      { status: 500 }
    );
  }
}
