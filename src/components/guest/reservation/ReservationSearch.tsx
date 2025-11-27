"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Users, Clock, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAvailableTables } from "@/hooks/reservation.hooks";

export default function ReservationSearch() {
  const queryParams = useSearchParams();
  const qtime = queryParams.get("time");
  const qdate = queryParams.get("date");
  const qpeople = queryParams.get("people");

  const [date, setDate] = useState(qdate ? qdate : "");
  const [people, setPeople] = useState(qpeople ? qpeople : "");
  const [time, setTime] = useState(qtime ? qtime.split(" ")[0] : "");
  const [amPm, setAmPm] = useState(qtime ? qtime.split(" ").pop() : "PM");
  const [error, setError] = useState("");
  const router = useRouter();
  const getDayName = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", { weekday: "long" });
  };

  const {
    data: availableTables,
    error: fetchError,
    refetch,
  } = useGetAvailableTables({
    time: time ? time : "",
    date: new Date(date ? date : ""),
  });
  console.log("error received is", fetchError);

  console.log("availabe tables are", availableTables);

  const validateTime = () => {
    const day = getDayName(date);

    if (!time) {
      setError("Please enter a time.");
      return false;
    }

    const clean = time.trim();

    const timeRegex = /^(\d{1,2})(:(\d{1,2}))?$/;

    const match = clean.match(timeRegex);
    if (!match) {
      setError("Invalid time format. Use formats like 4, 4:30, 12:05.");
      return false;
    }

    let hour = parseInt(match[1]);
    const minute = match[3] ? parseInt(match[3]) : 0;

    if (hour < 1 || hour > 12) {
      setError("Hour must be between 1 and 12.");
      return false;
    }

    if (minute < 0 || minute > 59) {
      setError("Minutes must be between 0 and 59.");
      return false;
    }

    const normalizedTime = `${hour}:${minute.toString().padStart(2, "0")}`;
    setTime(normalizedTime);

    if (amPm === "PM" && hour !== 12) hour += 12;
    if (amPm === "AM" && hour === 12) hour = 0;

    const totalMinutes = hour * 60 + minute;

    if (
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].includes(day)
    ) {
      if (totalMinutes <= 17 * 60 - 1) {
        setError("Sun–Thu reservations must be after 5:00 PM.");
        return false;
      }
    }

    if (day === "Friday") {
      if (totalMinutes <= 14 * 60 - 1) {
        setError("Friday reservations must be after 2:00 PM.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSearch = () => {
    if (!validateTime()) return;
    console.log("date,time and peopleand am pm", date, time, people, amPm);
    const fullTime = time + " " + amPm;
    router.replace(
      `/guest/reservation?date=${date}&time=${fullTime}&people=${people}`
    );
    refetch();
  };

  const day = getDayName(date);
  const isSaturday = day === "Saturday";

  return (
    <>
      <Card className="w-full h-full border-2 border-orange bg-white pt-4 px-5 md:pt-6 md:px-10 rounded-xl shadow-sm relative z-20">
        <CardContent className="flex flex-col items-center gap-8 w-full">
          <div className="flex md:flex-row flex-col gap-4 items-end justify-center font-roboto w-full">
            <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col w-full flex-1">
              <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
                Date
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <CalendarIcon size={18} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setAmPm("PM");
                  }}
                  className="outline-none w-full text-sm"
                />
              </div>
            </div>

            <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col flex-1 w-full">
              <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
                People
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Users size={18} />
                <select
                  className="outline-none w-full text-sm bg-transparent"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col w-full flex-1">
              <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
                Time
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={18} />

                <input
                  type="text"
                  placeholder="eg. 5:30"
                  className="outline-none w-full text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <select
                  value={amPm}
                  onChange={(e) => setAmPm(e.target.value)}
                  className="outline-none text-sm cursor-pointer"
                >
                  <option value="PM">PM</option>
                  <option value="AM" disabled={!isSaturday}>
                    AM
                  </option>
                </select>
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleSearch}
            className="bg-orange hover:bg-orange/90 text-white px-7 py-3 rounded-lg flex items-center gap-2"
          >
            <span className="text-xl font-medium font-inter">Search</span>
            <Search size={22} />
          </button>
        </CardContent>
      </Card>
    </>
  );
}
