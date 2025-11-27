"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TableCard({ table }: { table: any }) {
  const queryParams = useSearchParams();
  const querystring = queryParams.toString();
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-sm border py-5 px-7 border-gray-200 overflow-hidden relative">
      <div>
        <p className="text-center text-gray-800 font-lora font-semibold text-3xl tracking-wider">
          {table.tableName}
        </p>

        <div className="w-full h-fit relative my-4">
          <Image
            src="/guest/reservation/placeholder.png"
            alt="Table"
            className="object-cover w-full"
            height={200}
            width={300}
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Link href={`reservation/${table._id}?${querystring}`}>
          <button
            className="group w-fit px-7 py-4 mx-auto bg-orange hover:bg-orange/90 
                     flex items-center gap-1 text-white rounded-lg"
          >
            <span className="font-inter font-semibold text-lg">
              Reserve Table
            </span>

            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-3" />
          </button>
        </Link>
      </div>
    </div>
  );
}
