"use client";
import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import React from "react";
import { Suspense } from "react";
import ReservationContent from "./ReservationContent";

export const dynamic = "force-dynamic";

export default function ReservationPage() {
  return (
    <CommonSectionGuest>
      <Suspense fallback={<p>Loading Reservation...</p>}>
        <ReservationContent />
      </Suspense>
    </CommonSectionGuest>
  );
}
