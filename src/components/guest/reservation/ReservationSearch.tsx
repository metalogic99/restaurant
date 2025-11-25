import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Users, Clock, Search } from "lucide-react";

export default function ReservationSearch() {
  return (
    <Card className="w-full h-full  border-2 border-orange bg-white pt-4 px-5 md:pt-6 md:px-10 rounded-xl shadow-sm relative z-20">
      <CardContent className="flex flex-col items-center gap-8 w-full">
        <div className="flex md:flex-row flex-col gap-4 items-end justify-center font-roboto w-full">
          <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col w-full flex-1">
            <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
              Date
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <CalendarIcon size={18} />
              <input type="date" className="outline-none w-full text-sm" />
            </div>
          </div>

          <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col flex-1 w-full">
            <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
              People
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Users size={18} />
              <select className="outline-none w-full  text-sm bg-transparent">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="1">6</option>
                <option value="2">7</option>
                <option value="3">8</option>
                <option value="4">9</option>
                <option value="5">10</option>
              </select>
            </div>
          </div>

          <div className="border rounded-md border-[#787878] text-[#787878] px-3 py-2 flex flex-col w-full flex-1">
            <Label className="text-orange text-sm -mt-4 bg-white px-1 w-fit">
              Time
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Clock size={18} />
              <select className="outline-none w-full text-sm bg-transparent">
                <option>5:00 PM</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
              </select>
            </div>
          </div>
        </div>
        <button className="bg-orange hover:bg-orange/90  text-white px-7 py-3 rounded-lg flex items-center gap-2">
          <span className="text-xl font-medium font-inter">Search</span>{" "}
          <Search size={22} />
        </button>
      </CardContent>
    </Card>
  );
}
