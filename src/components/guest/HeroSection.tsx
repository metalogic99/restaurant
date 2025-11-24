import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-around w-full py-7 bg-heroBackground xl:px-10">
        <div className="font-poppins">
          <h1 className="text-4xl font-semibold mb-4">Delicious Food at</h1>
          <h1 className="text-4xl font-semibold text-forestGreenLight">
            MINT RESTAURANT
          </h1>
          <p className="mt-4 text-2xl ">Pure, Fresh and Green</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/guest/menu">
              <button className="bg-[#EF7901] text-white px-5 py-2 rounded flex items-center justify-center gap-2">
                View Menu <ArrowRight size={18} />
              </button>
            </Link>
            <button className="bg-forestGreenLight text-white px-5 py-2 rounded flex items-center justify-center gap-2">
              Reserve Table <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex justify-center md:justify-start items-center mt-4 text-yellow-500 text-4xl gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <Image
                key={num}
                src="/guest/star.png"
                alt="Star"
                width={30}
                height={30}
                className="sm:w-[35px] sm:h-[35px]"
              />
            ))}
          </div>
        </div>
        <div>
          <Image
            src="/guest/mint-girl.png"
            alt="Mint Girl"
            width={350}
            height={350}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
