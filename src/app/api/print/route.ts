// app/api/print/route.js
import { NextRequest, NextResponse } from "next/server";
import net from "net";
import connectDB from "@/utils/connectDB";
import Settings from "@/models/settings.model";

type SettingsType = {
  printerIP: string;
};

const PRINTER_PORT = 9100;

export async function POST(request: NextRequest): Promise<Response> {
  try {
    await connectDB();
    let printerIP = "";
    const settings = await Settings.findOne()
      .select("printerIP -_id")
      .lean<SettingsType>();
    if (settings) {
      printerIP = settings.printerIP;
    }
    const { escPosData } = await request.json();
    const buffer = Buffer.from(escPosData, "hex");

    return new Promise<Response>((resolve) => {
      const client = new net.Socket();

      client.connect(PRINTER_PORT, printerIP, () => {
        client.write(buffer);
        console.log("✓ Print job sent to printer");
        client.destroy();

        resolve(
          NextResponse.json({
            success: true,
            message: "Print job sent successfully",
          }),
        );
      });

      client.on("error", (err) => {
        console.error("✗ Printer error:", err);
        resolve(
          NextResponse.json(
            {
              success: false,
              error: err.message,
            },
            { status: 500 },
          ),
        );
      });

      client.on("timeout", () => {
        console.error("✗ Printer timeout");
        resolve(
          NextResponse.json(
            {
              success: false,
              error: "Printer timeout - check connection",
            },
            { status: 500 },
          ),
        );
      });
    });
  } catch (error) {
    console.log("error in printing bill", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
