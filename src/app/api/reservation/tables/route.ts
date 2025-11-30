// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/utils/connectDB";
// import Reservation from "@/models/reservation.model";
// import Table from "@/models/tableModel";

// function convertTo24HourDate(dateString: string, time12h: string) {
//   const [time, meridian] = time12h.split(" ");
//   let [hours, minutes] = time.split(":").map(Number);
//   if (meridian === "PM" && hours !== 12) hours += 12;
//   if (meridian === "AM" && hours === 12) hours = 0;
//   minutes = minutes || 0;

//   const date = new Date(dateString);
//   date.setHours(hours, minutes, 0, 0);
//   return date;
// }

// export async function GET(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams;

//     const date = searchParams.get("date");
//     const time = searchParams.get("time");

//     if (!date || !time) {
//       return NextResponse.json(
//         { error: "date and time are required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     // const convertedTime = convertTo24HourDate(date, time);
//     // const targetTime = new Date(`${date}T${convertedTime}:00`);
//     const targetTime = convertTo24HourDate(date, time);

//     const fifteenMin = 15 * 60 * 1000;

//     const startTime = new Date(targetTime.getTime() - fifteenMin);
//     const endTime = new Date(targetTime.getTime() + fifteenMin);

//     const conflictingReservations = await Reservation.find({
//       date: new Date(date),
//       time: { $gte: startTime.getTime(), $lte: endTime.getTime() },
//     }).select("table");

//     const reservedTableIds = conflictingReservations.map((r) =>
//       r.table?._id.toString()
//     );

//     const availableTables = await Table.find({
//       _id: { $nin: reservedTableIds },
//     });

//     return NextResponse.json(
//       { success: true, tables: availableTables },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error Fetching Available Tables:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export const dynamic = "force-dynamic";

import connectDB from "@/utils/connectDB";
import Reservation from "@/models/reservation.model";
import Table from "@/models/tableModel";
import { NextRequest, NextResponse } from "next/server";

function convertTo24HourDate(dateStr: string, time12h: string) {
  const [time, meridian] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  minutes = minutes || 0;

  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { date, time } = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );

    if (!date || !time) {
      return NextResponse.json(
        { error: "Date and time are required" },
        { status: 400 }
      );
    }

    const targetTime = convertTo24HourDate(date, time);
    const fifteenMin = 15 * 60 * 1000;

    const startTime = new Date(targetTime.getTime() - fifteenMin);
    const endTime = new Date(targetTime.getTime() + fifteenMin);

    const reserved = await Reservation.find({
      time: { $gte: startTime, $lte: endTime },
    }).select("table");

    const reservedTableIds = reserved.map((r) => r.table.toString());

    const availableTables = await Table.find(
      { _id: { $nin: reservedTableIds } },
      { duration: 0, activeOrderId: 0, status: 0 }
    );

    return NextResponse.json({ success: true, tables: availableTables });
  } catch (error) {
    console.log("ERROR FROM HERE", error)
    console.error("Error Fetching Available Tables:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
