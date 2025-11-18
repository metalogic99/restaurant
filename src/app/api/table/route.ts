import { authenticate } from "@/middleware/authentication";
import Table from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const authentication = await authenticate(req, ["admin", "receptionist"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { tableName } = await req.json();
    if (!tableName) {
      return NextResponse.json(
        {
          success: false,
          message: "Table Number is required",
        },
        { status: 400 }
      );
    }

    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    if (!tableName) {
      return NextResponse.json(
        {
          success: false,
          message: "Table Number is required",
        },
        { status: 400 }
      );
    }
    await connectDB();
    const table = await Table.findOne({ tableName: tableName });
    if (table) {
      return NextResponse.json(
        {
          success: false,
          message: "Table already exists",
        },
        { status: 409 }
      );
    }
    await Table.create({
      tableName,
    });
    NextResponse.json({
      success: true,
      message: "New Table Created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side Error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const authentication = await authenticate(req, [
      "admin",
      "waiter",
      "receptionist",
    ]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    await connectDB();
    const tables = await Table.find();
    return NextResponse.json(
      {
        success: true,
        message: "All tables",
        data: tables,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Side Error",
      },
      { status: 500 }
    );
  }
};
