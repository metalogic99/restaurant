import { authenticate } from "@/middleware/authentication";
import Expense from "@/models/expense.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { name, amount, date } = await req.json();
    const { id: expenseId } = params;
    const isAuthenticated = await authenticate(req, ["admin"]);
    if (!isAuthenticated.success) {
      return NextResponse.json(isAuthenticated, { status: 401 });
    }
    if (!name || !amount || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields not received",
        },
        { status: 403 }
      );
    }
    const isValidMongoId = mongoose.isValidObjectId(expenseId);
    if (!isValidMongoId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not a valid mongo Id",
        },
        { status: 403 }
      );
    }
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return NextResponse.json(
        {
          success: false,
          message: "Expense doesn't exist",
        },
        { status: 404 }
      );
    }
    expense.name = name;
    expense.amount = amount;
    expense.date = new Date(date);
    await expense.save();
    return NextResponse.json(
      {
        success: true,
        message: "Expense Update Successful",
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
  { params: { id: expenseId } }: { params: { id: string } }
) => {
  try {
    const isAuthenticated = await authenticate(req, ["admin"]);
    if (!isAuthenticated.success) {
      return NextResponse.json(isAuthenticated, { status: 401 });
    }
    const isValidMongoId = mongoose.isValidObjectId(expenseId);
    if (!isValidMongoId) {
      return NextResponse.json(
        { success: false, message: "Not a valid mongo Id" },
        { status: 400 }
      );
    }
    const expense = await Expense.findByIdAndDelete(expenseId);
    if (!expense) {
      return NextResponse.json(
        { success: false, message: "Expense doesn't exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Expense deleted",
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
