"use client";
import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import PreOrderPopUp from "@/components/guest/reservation/PreOrderPopUp";
import TableLayout from "@/components/guest/reservation/TableLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ReservationForm() {
  const [preorder, setPreorder] = useState("yes");
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (preorder === "yes") {
      setOpen(true);
    } else {
      router.push("/guest");
    }
  };

  return (
    <CommonSectionGuest>
      <div className="min-h-screen px-6 md:px-24 w-full bg-heroBackground font-prociono py-10 ">
        <div className="flex justify-between items-center mb-10">
          <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold text-orange tracking-wider">
            Reservation Form
          </h1>
          <span
            onClick={() => setShowLayout((prev) => !prev)}
            className="text-forestGreenLight underline text-lg cursor-pointer"
          >
            View Layout
          </span>
        </div>

        {showLayout && <TableLayout />}
        <PreOrderPopUp open={open} setOpen={setOpen} />
        <form
          onSubmit={handleSubmit}
          className="mt-10 text-[#787878] font-roboto"
        >
          <ReservationFormLabel>Name*</ReservationFormLabel>{" "}
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
          />
          <ReservationFormLabel>Mobile Number*</ReservationFormLabel>
          <input
            type="text"
            placeholder="+977"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
          />
          <ReservationFormLabel>No. of People</ReservationFormLabel>
          <input
            type="number"
            placeholder="Enter no. of people dine in"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
          />
          <ReservationFormLabel>
            Do you want to pre order food ?
          </ReservationFormLabel>
          <div className="flex gap-10 items-center mb-10">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center`}
              >
                <div
                  className={`h-3 w-3 rounded-full  ${
                    preorder === "yes" ? "bg-orange " : "bg-transparent"
                  } `}
                ></div>
              </div>
              <input
                type="radio"
                className="hidden"
                name="preorder"
                checked={preorder === "yes"}
                onChange={() => setPreorder("yes")}
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center`}
              >
                <div
                  className={`h-3 w-3 rounded-full  ${
                    preorder === "no" ? "bg-orange " : "bg-transparent"
                  } `}
                ></div>
              </div>
              <input
                type="radio"
                className="hidden"
                name="preorder"
                checked={preorder === "no"}
                onChange={() => setPreorder("no")}
              />
              <span>No</span>
            </label>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="bg-orange text-white font-semibold tracking-wider font-inter text-lg px-8 py-3 rounded-lg"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </CommonSectionGuest>
  );
}

const ReservationFormLabel = ({ children }: { children: React.ReactNode }) => {
  return <label className="block mb-2 text-lg font-inter">{children}</label>;
};
