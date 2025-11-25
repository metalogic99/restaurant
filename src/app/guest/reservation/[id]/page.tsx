"use client";
import { useState } from "react";

export default function ReservationForm() {
  const [preorder, setPreorder] = useState("yes");

  return (
    <div className="min-h-screen w-full bg-[#F8FBEF] px-6 py-10 text-[#3A3A3A] font-inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-lora font-bold text-orange">
          Reservation Form
        </h1>
        <a href="#" className="text-green-700 underline text-lg">
          View Layout
        </a>
      </div>

      {/* Form */}
      <form className="max-w-xl">
        {/* Name */}
        <label className="block mb-2 font-semibold">Name*</label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
        />

        {/* Mobile Number */}
        <label className="block mb-2 font-semibold">Mobile Number*</label>
        <input
          type="text"
          placeholder="+977"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
        />

        {/* No of People */}
        <label className="block mb-2 font-semibold">No. of People</label>
        <input
          type="number"
          placeholder="Enter no. of people dine in"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-1 focus:ring-orange"
        />

        {/* Radio Buttons */}
        <p className="font-semibold mb-3">Do you want to pre order food ?</p>

        <div className="flex gap-10 items-center mb-10">
          {/* Yes */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span
              className={`h-5 w-5 rounded-full border-2 ${
                preorder === "yes"
                  ? "border-orange bg-orange"
                  : "border-gray-400"
              } flex items-center justify-center`}
            >
              {preorder === "yes" && (
                <span className="block h-2.5 w-2.5 bg-white rounded-full"></span>
              )}
            </span>
            <input
              type="radio"
              className="hidden"
              name="preorder"
              checked={preorder === "yes"}
              onChange={() => setPreorder("yes")}
            />
            <span>Yes</span>
          </label>

          {/* No */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span
              className={`h-5 w-5 rounded-full border-2 ${
                preorder === "no"
                  ? "border-orange bg-orange"
                  : "border-gray-400"
              } flex items-center justify-center`}
            >
              {preorder === "no" && (
                <span className="block h-2.5 w-2.5 bg-white rounded-full"></span>
              )}
            </span>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange text-white font-semibold text-lg px-8 py-3 rounded-lg"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}
