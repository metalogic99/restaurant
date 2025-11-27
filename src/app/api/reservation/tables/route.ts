import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Reservation from "@/models/reservation.model";
import Table from "@/models/tableModel";

function convertTo24Hour(time12h: string) {
  const [time, meridian] = time12h.split(" ");
  let hour = Number(time.split(":")[0]);
  const minute = Number(time.split(":")[1] || "0");

  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (!date || !time) {
      return NextResponse.json(
        { error: "date and time are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const convertedTime = convertTo24Hour(time);
    const targetTime = new Date(`${date}T${convertedTime}:00`);

    const fifteenMin = 15 * 60 * 1000;

    const startTime = new Date(targetTime.getTime() - fifteenMin);
    const endTime = new Date(targetTime.getTime() + fifteenMin);

    const conflictingReservations = await Reservation.find({
      date: new Date(date),
      time: { $gte: startTime.getTime(), $lte: endTime.getTime() },
    }).select("table");

    const reservedTableIds = conflictingReservations.map((r) =>
      r.table?._id.toString()
    );

    const availableTables = await Table.find({
      _id: { $nin: reservedTableIds },
    });

    return NextResponse.json(
      { success: true, tables: availableTables },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Fetching Available Tables:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
