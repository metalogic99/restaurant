// import GuestMenu from "@/components/guest/GuestMenu";
// import OccupyTable from "@/components/guest/OccupyTable";
// import TodaySpecial from "@/components/guest/TodaySpecial";
// import { Suspense } from "react";

import AboutSection from "@/components/guest/AboutSection";
import HeroSection from "@/components/guest/HeroSection";
import TestimonialCarousel from "@/components/guest/TestimonialsCarousel";

const GuestPage = () => {
  return (
    <section className="max-w-7xl mx-auto overflow-x-hidden">
      {/* <Suspense>
        <OccupyTable />
      </Suspense>
     <TodaySpecial />
      <GuestMenu /> */}
      <div className="w-full font-sans text-gray-800 px-2 md:px-0">
        <HeroSection />
        <AboutSection />
        <TestimonialCarousel />

        {/* Footer */}
        {/* <footer className="py-10 px-10 bg-green-100 text-center">
          <div className="text-green-600 text-2xl font-bold">
            Mint Restaurant
          </div>
          <p className="text-gray-600 mt-2">Fresh • Organic • Pure</p>
        </footer> */}
      </div>
    </section>
  );
};

export default GuestPage;
