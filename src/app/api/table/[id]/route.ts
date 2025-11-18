import { authenticate } from "@/middleware/authentication";
import Table, { ITable } from "@/models/tableModel";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { status, name } = await req.json();
    const { id: tableId } = params;
    if (!status && !name) {
      return NextResponse.json(
        {
          success: false,
          message: "Requirements to update table do not reach",
        },
        { status: 400 }
      );
    }
    if (status === "available") {
      const authentication = await authenticate(req, ["admin", "receptionist"]);
      if (!authentication.success) {
        return NextResponse.json(authentication, { status: 401 });
      }
    }
    const isValidTableId = mongoose.isValidObjectId(tableId);
    if (!isValidTableId) {
      return NextResponse.json(
        {
          success: false,
          message: "TableId is not valid",
        },
        { status: 400 }
      );
    }

    connectDB();
    const table: ITable | null = await Table.findById(tableId);
    if (!table) {
      return NextResponse.json(
        {
          success: false,
          message: "Table not found",
        },
        { status: 404 }
      );
    }

    if (status !== undefined) {
      table.status = status;
      table.duration = new Date();
    }
    if (name !== undefined) {
      table.tableName = name;
    }

    await table.save();

    return NextResponse.json(
      {
        success: true,
        message: `Table ${table.tableName} updated`,
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { id: tableId } = params;
    const isValidTableId = mongoose.isValidObjectId(tableId);
    if (!isValidTableId) {
      return NextResponse.json({
        success: false,
        message: "Not a valid table Id",
      });
    }

    await connectDB();
    const table = await Table.findById(tableId);
    if (!table) {
      NextResponse.json({
        success: false,
        message: "Table doesn't exist",
      });
    }
    await Table.findByIdAndDelete(tableId);
    return NextResponse.json({
      success: true,
      message: "Table deletion successful",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Server side error",
    });
  }
};
