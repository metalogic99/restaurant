"use client";

import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import PreOrderPopUp from "@/components/guest/reservation/PreOrderPopUp";
import TableLayout from "@/components/guest/reservation/TableLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  reservationFormSchema,
  ReservationFormValues,
} from "@/schemas/reservation.schema";
import {
  useCreateReservation,
} from "@/hooks/reservation.hooks";
import { toast } from "sonner";

export default function ReservationForm({
  params,
}: {
  params: { id: string };
}) {
  const [showLayout, setShowLayout] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useCreateReservation();
  const searchParams = useSearchParams();

  const time = searchParams.get("time");
  const date = searchParams.get("date");
  const { id: tableId } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      preOrder: true,
    },
  });

  const preorder = watch("preOrder");

  const onSubmit = (data: ReservationFormValues) => {
    if (!time || !date) {
      toast.error("No Date and time mentioned so redirecting to previous page");
      router.push("/reservation");
      return;
    }
    console.log("data from form is", data);
    const reservationData: ReservationRequest = {
      ...data,
      tableId,
      time: time,
      date: new Date(date),
    };
    mutate(reservationData, {
      onSuccess: () => {
        toast.success("Reservation Done successfully");
      },
      onError: (e) => {
        console.log("error encoutnered", e);
        toast.error("Failed to reserve table");
      },
    });
    if (data.preOrder) {
      setOpen(true);
      reset();
    } else {
      reset();
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
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 text-[#787878] font-roboto"
        >
          {/* Name */}
          <ReservationFormLabel>Name*</ReservationFormLabel>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-1 outline-none focus:ring-1 focus:ring-orange"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
          )}

          {/* Phone */}
          <ReservationFormLabel>Mobile Number*</ReservationFormLabel>
          <input
            {...register("phone")}
            type="text"
            placeholder="+977"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-1 outline-none focus:ring-1 focus:ring-orange"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mb-4">{errors.phone.message}</p>
          )}

          {/* People */}
          <ReservationFormLabel>No. of People*</ReservationFormLabel>
          <input
            {...register("peopleNos", { valueAsNumber: true })}
            type="number"
            placeholder="Enter no. of people dine in"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-1 outline-none focus:ring-1 focus:ring-orange"
          />
          {errors.peopleNos && (
            <p className="text-red-500 text-sm mb-4">
              {errors.peopleNos.message}
            </p>
          )}

          {/* Preorder */}
          <ReservationFormLabel>
            Do you want to pre order food?
          </ReservationFormLabel>

          <div className="flex gap-10 items-center mb-10">
            {/* YES */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("preOrder")}
                type="radio"
                value="true"
                checked={preorder === true}
                onChange={() => {}}
                className="hidden"
              />
              <div className="h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div
                  className={`h-3 w-3 rounded-full ${
                    preorder ? "bg-orange" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <span>Yes</span>
            </label>

            {/* NO */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("preOrder")}
                type="radio"
                value="false"
                checked={preorder === false}
                onChange={() => {}}
                className="hidden"
              />
              <div className="h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div
                  className={`h-3 w-3 rounded-full ${
                    !preorder ? "bg-orange" : "bg-transparent"
                  }`}
                ></div>
              </div>
              <span>No</span>
            </label>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              disabled={isPending}
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
