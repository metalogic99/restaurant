// import GuestMenu from "@/components/guest/GuestMenu";
// import OccupyTable from "@/components/guest/OccupyTable";
// import TodaySpecial from "@/components/guest/TodaySpecial";
// import { Suspense } from "react";

import HeroSection from "@/components/guest/HeroSection";
import Image from "next/image";

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

        <section className="bg-green-50 py-20 px-10 grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p className="text-gray-600 leading-7 max-w-lg">
              Welcome to Mint Restaurant, the premier destination for luxurious
              vegetarian cuisine in Pokhara. Our restaurant artfully blends
              traditional craftsmanship with modern culinary delights to provide
              a refreshing and health-conscious dining experience. Whether
              you&apos;re a foodie seeking new flavors or someone who values
              fresh, organic meals, Mint Restaurant welcomes you.
            </p>
          </div>

          <div className="flex justify-center mt-10 md:mt-0">
            <Image
              src="/qr-mobile.png"
              alt="QR Code"
              width={300}
              height={300}
              className="shadow-xl rounded-xl"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-10 text-center">
          <h2 className="text-3xl font-bold mb-10">TESTIMONIALS</h2>

          <div className="flex justify-center items-center gap-10">
            <button className="text-3xl">&#60;</button>

            <div className="bg-yellow-300 w-80 md:w-96 p-6 rounded-xl shadow-xl">
              <p className="text-sm mb-4">
                At Ashford Consulting, my time here completely reshaped how I
                handle leadership, teamwork, and real-world workplace problems.
              </p>
              <button className="text-sm underline">Read More</button>
              <div className="mt-4 text-left text-sm font-medium">
                - Adilene Zelano
              </div>
            </div>

            <button className="text-3xl">&#62;</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-10 bg-green-100 text-center">
          <div className="text-green-600 text-2xl font-bold">
            Mint Restaurant
          </div>
          <p className="text-gray-600 mt-2">Fresh • Organic • Pure</p>
        </footer>
      </div>
    </section>
  );
};

export default GuestPage;
