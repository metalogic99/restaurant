// app/menu/page.tsx
import CommonSectionGuest from "@/components/guest/CommonSectionGuest";
import TodaySpecial from "@/components/guest/TodaySpecial";
import Image from "next/image";
import React from "react";

export default function page() {
  const heroImage = "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png";

  const categories = [
    {
      title: "Appetizers and Snacks",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
    {
      title: "Main Course",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
    {
      title: "Breakfast",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
    {
      title: "Salad",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
    {
      title: "Deserts",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
    {
      title: "Pizza",
      subtitle: "",
      placeholder: "/mnt/data/6977374a-1c1e-4f66-bc54-e14512244fde.png",
    },
  ];

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
          <h3 className="mt-6 text-[#f1771a] font-semibold text-sm">
            Our Categories
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-y-6 gap-x-6">
            {categories.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-[88px] h-[88px] rounded-full bg-white shadow-md overflow-hidden relative flex items-center justify-center">
                  <Image
                    src={c.placeholder}
                    alt={c.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="88px"
                    unoptimized
                  />
                </div>

                <div className="mt-3 w-[100px] text-center">
                  <div className="relative">
                    <div className="absolute inset-0 -skew-x-6 bg-[#f1771a] h-7 rounded-md transform -z-10" />
                    <p className="text-[12px] text-white font-semibold relative z-10 px-2">
                      {c.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* bottom spacing */}
          <div className="h-8" />
        </div>
      </CommonSectionGuest>
    </main>
  );
}
