"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import ReservationSearch from "@/components/guest/reservation/ReservationSearch";
import TableCard from "@/components/guest/reservation/TableCard";
import { useGetAvailableTables } from "@/hooks/reservation.hooks";
import { useSearchParams } from "next/navigation";

const ReservationContent = () => {
  const queryParams = useSearchParams();
  const qtime = queryParams.get("time");
  const qdate = queryParams.get("date");
  const { data: availableTables, refetch } = useGetAvailableTables({
    time: qtime ? qtime : "",
    date: new Date(qdate ? qdate : ""),
  });

  return (
    <CommonSectionGuest>
      <div className="py-14 bg-heroBackground px-6 md:px-24 text-[#3A3A3A] font-prociono min-h-screen relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="md:text-5xl sm:text-3xl text-2xl  font-bold text-orange tracking-wider mb-2">
              RESERVATION
            </h1>
            <p className="text-gray-600 leading-snug font-sans max-w-md text-lg">
              Reservations available: Sun–Thu after 5 PM,
              <br />
              Friday after 2 PM, and all day Saturday.
            </p>
          </div>
        </motion.div>

        <div className="relative mt-8">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/guest/reservation/mintGirl.png"
              alt="reservation-girl"
              width={140}
              height={140}
              className="hidden sm:block absolute -top-2 -translate-y-3/4 right-0 z-0 "
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
          >
            <ReservationSearch refetch={refetch} />
          </motion.div>
        </div>
        <div className="mt-10 w-full bg-pink space-y-8">
          {availableTables &&
            availableTables.tables &&
            availableTables.tables.map((table: any) => (
              <TableCard key={table._id} table={table} />
            ))}
        </div>
      </div>
    </CommonSectionGuest>
  );
};

export default ReservationContent;
