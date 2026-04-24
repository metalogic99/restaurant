"use client";

import { useGetInvoiceNumber, useUpdateOrder } from "@/hooks/order.hooks";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetSettings } from "@/hooks/settings.hooks";

const ESC = "1b";
const GS = "1d";
const COMMANDS = {
  INIT: ESC + "40",
  LINEFEED: "0a",
  BOLD_ON: ESC + "2108",
  BOLD_OFF: ESC + "2100",
  CENTER: ESC + "6101",
  LEFT: ESC + "6100",
  DOUBLE_SIZE: GS + "2111",
  RESET_SIZE: GS + "2100",
  CUT: GS + "5600",
};

const BillModal = ({ onClose, order, table }: any) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const router = useRouter();
  const { mutate: updateOrder } = useUpdateOrder(order.tableId);
  const { data } = useGetSettings();
  const { data: invoiceData } = useGetInvoiceNumber();

  const formatFullDate = () =>
    new Date().toLocaleDateString("en-US", {
      month: "short", // Result: Apr, Mar, Feb
      day: "2-digit", // Result: 09
      year: "numeric", // Result: 2026
    });

  const formatFullTime = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const totalQty = order.orderedProducts.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  const toHex = (str: string) => Buffer.from(str, "utf8").toString("hex");
  const tragedies = (str: string) => toHex(str) + COMMANDS.LINEFEED;

  const generateEscPosData = () => {
    const WIDTH = 48;
    const DOT_LINE = "- ".repeat(WIDTH / 2);
    let hex = COMMANDS.INIT;

    // Header
    hex += COMMANDS.CENTER + COMMANDS.BOLD_ON;
    hex += tragedies(data?.displayName?.toUpperCase() || "CHIYA O'CLOCK");
    hex += COMMANDS.BOLD_OFF;
    hex += tragedies(data?.vat ? `VAT: ${data.vat}` : "Your Tax Number");
    hex += tragedies(data?.location || "Kumari Marg, Naxal, Kathmandu");
    hex += tragedies(`+977 ${data?.phoneNumber || "9814034734"}`);
    hex += COMMANDS.LINEFEED;
    hex += tragedies("Estimate Invoice");
    hex += COMMANDS.LINEFEED;

    // Table & Date Info
    hex += COMMANDS.LEFT;
    const tableStr = `Table: ${table}`;
    const dateStr = `Date: ${formatFullDate()}`;
    hex += tragedies(tableStr.padEnd(WIDTH - dateStr.length) + dateStr);
    hex += tragedies(
      `Invoice No: ${invoiceData && invoiceData.data ? invoiceData.data : ""}`.padEnd(
        WIDTH - formatFullTime().length,
      ) + formatFullTime(),
    );
    hex += tragedies(DOT_LINE);

    // Columns
    hex += tragedies(
      "S.N ".padEnd(4) +
        "Particular ".padEnd(20) +
        "Rate ".padStart(8) +
        "QTY ".padStart(6) +
        "Amt ".padStart(10),
    );
    hex += tragedies(DOT_LINE);

    // Products
    order.orderedProducts.forEach((item: any, index: number) => {
      const sn = (index + 1).toString().padEnd(4);
      const name = item.product.name.substring(0, 19).padEnd(20);
      const rate = item.product.price.toString().padStart(8);
      const qty = item.quantity.toString().padStart(6);
      const amt = (item.quantity * item.product.price).toString().padStart(10);
      hex += tragedies(sn + name + rate + qty + amt);
    });
    hex += tragedies(DOT_LINE);

    // Summary Rows
    // Align Qty exactly under the QTY column (which ends at position 38)
    const label = "Item Total".padEnd(32);
    const qtyVal = totalQty.toString().padStart(6);
    const amtVal = `Rs ${order.grossTotal}`.padStart(10);
    hex += tragedies(label + qtyVal + amtVal);

    hex += tragedies(DOT_LINE);
    hex += tragedies(
      "Sub Total".padEnd(35) + `Rs ${order.grossTotal}`.padStart(13),
    );
    hex += tragedies(
      `Discount`.padEnd(35) + `Rs ${order.discount}`.padStart(13),
    );
    hex +=
      COMMANDS.BOLD_ON +
      tragedies(`Total Amount`.padEnd(35) + `Rs ${order.total}`.padStart(13)) +
      COMMANDS.BOLD_OFF;

    hex += COMMANDS.LINEFEED + COMMANDS.CENTER;
    hex += tragedies("Thank you for dining with us!");
    hex += tragedies("Please visit us again!");
    hex += COMMANDS.LINEFEED + COMMANDS.LINEFEED + COMMANDS.CUT;

    return hex;
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const response = await fetch("/api/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escPosData: generateEscPosData() }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      updateOrder(
        { orderId: order._id, status: "completed" },
        {
          onSuccess: () => {
            toast.success("Printed & Finalized");
            router.push("/");
          },
        },
      );
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center px-6">
          <h3 className="font-semibold text-gray-800 tracking-tight">
            Invoice Preview
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-gray-100/50">
          <div className="bg-white p-6 shadow-sm font-sans text-gray-800 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-black">
                {data?.displayName || "Chiya O'Clock"}
              </h2>
              <p className="text-xs text-gray-500">
                {data?.vat ? `VAT: ${data.vat}` : "Your Tax number"}
              </p>
              <p className="text-xs text-gray-500">
                {data?.location || "Kumari Marg, Naxal, Kathmandu"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                +977 {data?.phoneNumber || "9814034734"}
              </p>
              <h3 className="mt-4 font-bold text-black text-sm uppercase">
                Estimate Invoice
              </h3>
            </div>

            {/* Meta */}
            <div className="flex justify-between text-[11px] font-medium border-b border-dashed border-gray-200 pb-2 mb-2">
              <span className="text-blue-600">Table: {table}</span>
              <span>{formatFullDate()}</span>
            </div>
            <div className="flex justify-between text-[11px] mb-4">
              <span>
                Invoice No:{" "}
                {invoiceData && invoiceData.data ? invoiceData.data : ""}
              </span>
              <span>{formatFullTime()}</span>
            </div>

            {/* Table Header */}
            <div className="border-t border-dashed border-gray-300 py-2 flex justify-between font-bold text-black text-[10px] uppercase">
              <span className="w-[8%]">S.N</span>
              <span className="w-[42%]">Particular</span>
              <span className="w-[15%] text-right">Rate</span>
              <span className="w-[10%] text-right">QTY</span>
              <span className="w-[25%] text-right">Amt</span>
            </div>

            {/* Product Rows */}
            <div className="space-y-3 mb-4 border-t border-dashed border-gray-300 pt-3">
              {order.orderedProducts.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="w-[8%] text-gray-400">{idx + 1}</span>
                  <span className="w-[42%] font-medium">
                    {item.product.name}
                  </span>
                  <span className="w-[15%] text-right">
                    Rs {item.product.price}
                  </span>
                  <span className="w-[10%] text-right">{item.quantity}</span>
                  <span className="w-[25%] text-right font-bold text-black">
                    Rs {item.quantity * item.product.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="border-t border-dashed border-gray-300 pt-3 space-y-2">
              <div className="flex justify-between font-bold text-[11px] text-black">
                <span className="w-[50%]">Item Total</span>
                <span className="w-[25%] text-right">
                  {totalQty.toString().padStart(2, "0")}
                </span>
                <span className="w-[25%] text-right">
                  Rs {order.grossTotal}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 mt-2 pt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Sub Total</span>
                  <span className="font-semibold">Rs {order.grossTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Discount</span>
                  <span>Rs {order.discount}</span>
                </div>
                <div className="flex justify-between font-black text-black text-sm pt-2 border-t border-black/5">
                  <span>Total Amount</span>
                  <span>Rs {order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            {isPrinting ? "Processing Printer..." : "Confirm & Print Bill"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
