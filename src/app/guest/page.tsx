import GuestMenu from "@/components/guest/GuestMenu";
import OccupyTable from "@/components/guest/OccupyTable";
import TodaySpecial from "@/components/guest/TodaySpecial";
import { Suspense } from "react";

const GuestPage = () => {
  return (
    <section className="max-w-7xl mx-auto overflow-x-hidden">
      <Suspense>
        <OccupyTable />
      </Suspense>
      <TodaySpecial />
      <GuestMenu />
    </section>
  );
};

export default GuestPage;
