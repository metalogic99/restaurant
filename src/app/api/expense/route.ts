import { authenticate } from "@/middleware/authentication";
import Expense from "@/models/expense.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const isauthenticated = await authenticate(req, ["admin"]);
    if (!isauthenticated.success) {
      return NextResponse.json(isauthenticated, { status: 401 });
    }
    const { name, amount, date } = await req.json();
    console.log(name, amount, date, "are receive");
    if (!name || !amount || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Amount, Date are required",
        },
        { status: 400 }
      );
    }
    await connectDB();
    await Expense.create({
      name,
      amount,
      date,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Expense creation successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const authentication = await authenticate(req, ["admin"]);
    if (!authentication.success) {
      return NextResponse.json(authentication, { status: 401 });
    }
    const { searchParams } = req.nextUrl;
    const pageString = searchParams.get("page");
    const time = searchParams.get("time");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = Number(pageString ?? "1") - 1;
    let filter = {};
    const now = new Date();
    if (time && time !== "allTime") {
      let startDate: Date;
      let endDate = now;

      switch (time) {
        case "today":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "weekly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate() - 7,
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "monthly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth() - 1,
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;

        case "yearly":
          startDate = new Date(
            Date.UTC(
              now.getUTCFullYear() - 1,
              now.getUTCMonth(),
              now.getUTCDate(),
              0,
              0,
              0,
              0
            )
          );
          endDate = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate(),
              23,
              59,
              59,
              999
            )
          );
          break;
        case "custom":
          console.log("from and to are as", from, to);
          if (from && to) {
            startDate = new Date(from);
            endDate = new Date(to);
            endDate.setHours(23, 59, 59, 999);
          } else {
            return NextResponse.json(
              {
                success: false,
                message: "Missing 'from' or 'to' for custom time filter",
              },
              { status: 400 }
            );
          }
          break;

        default:
          startDate = undefined!;
          endDate = undefined!;
      }

      if (startDate && endDate) {
        filter = { ...filter, createdAt: { $gte: startDate, $lte: endDate } };
      }
    }
    console.log("filter for the order is", filter);
    await connectDB();
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(page * 30)
      .limit(30);
    let totalAmount = 0;
    let totalFilteredExpense = 0;
    if (page === 0) {
      totalFilteredExpense = await Expense.countDocuments(filter);
      const allFilteredExpenses = await Expense.find(filter);
      allFilteredExpenses.forEach((expense) => {
        totalAmount = totalAmount + expense.amount;
      });
    }
    return NextResponse.json({
      success: true,
      message: "All expenses",
      expenses: expenses,
      totalExpense: totalFilteredExpense,
      totalAmount,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Server Side Error",
    });
  }
};
