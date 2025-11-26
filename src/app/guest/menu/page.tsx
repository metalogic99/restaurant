// import CategoriesSection from "@/components/guest/CategoriesSection";
import CategoriesSectionDesktop from "@/components/guest/CategoriesSectionDesktop";
import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import TodaySpecial from "@/components/guest/TodaySpecial";
import React from "react";
export default function page() {
  return (
    <main className="w-full">
      <CommonSectionGuest>
        <div className="bg-heroBackground pt-12">
          {" "}
          <h1 className="text-5xl text-center text-orange mt-2 font-prociono tracking-wide">
            MENU
          </h1>
          {/* <div className="mt-4 bg-white rounded-lg shadow-lg border border-[#eee] overflow-hidden">
            <div className="relative w-full h-[200px]">
              <Image
                src={heroImage}
                alt="hero"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 340px) 340px"
                unoptimized
              />
              <div className="absolute top-3 right-3 bg-[#f1771a] text-white font-semibold px-3 py-1 rounded-md text-sm shadow">
                Rs. 250
              </div>

              <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                <span className="text-[#f1771a] font-bold text-lg select-none">
                  {"<"}
                </span>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                <span className="text-[#f1771a] font-bold text-lg select-none">
                  {">"}
                </span>
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="text-sm text-[#6dbb5a] font-medium">
                Today&apos;s Special
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-semibold">Veg Noodles</span>
                <span className="flex-1" />
              </div>
            </div>
          </div> */}
          <TodaySpecial />
          {/* <CategoriesSection /> */}
          <CategoriesSectionDesktop/>
          {/* bottom spacing */}
          <div className="h-8" />
        </div>
      </CommonSectionGuest>
    </main>
  );
}
