import React from "react";
import Image from "next/image";

const rootPath = "/guest/menu";

const categories = [
  {
    title: "Appetizers and Snacks",
    subtitle: "",
    placeholder: `${rootPath}/frenchFries.png`,
  },
  {
    title: "Main Course",
    subtitle: "",
    placeholder: `${rootPath}/momo.png`,
  },
  {
    title: "Breakfast",
    subtitle: "",
    placeholder: `${rootPath}/bread.png`,
  },
  {
    title: "Salad",
    subtitle: "",
    placeholder: `${rootPath}/salad.png`,
  },
  {
    title: "Deserts",
    subtitle: "",
    placeholder: `${rootPath}/icecream.png`,
  },
  {
    title: "Pizza",
    subtitle: "",
    placeholder: `${rootPath}/pizza.png`,
  },
];
const CategoriesSection = () => {
  return (
    <section className="max-w-3xl  mx-auto font-rockNRoll px-2 md:px-0">
      <h3 className="mt-6 text-orange text-3xl leading-relaxed tracking-normal">
        Our Categories
      </h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
        {categories.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[180px] h-[180px] rounded-full bg-white shadow-md overflow-hidden relative flex items-center justify-center">
              <Image
                src={c.placeholder}
                alt={c.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="180px"
                unoptimized
              />
            </div>

            <div className="mt-3 text-center">
              <div className="w-[250px] h-16 flex text-xl items-center justify-center bg-[url('/guest/menu/categoryName.png')] bg-no-repeat bg-cover bg-left">
                {/* <div className="absolute inset-0 -skew-x-6 bg-[#f1771a] h-7 rounded-md transform -z-10" />
                <p className="text-[12px] text-white font-semibold relative z-10 px-2">
                  {c.title}
                </p> */}
                <div className="w-2/3 text-wrap">{c.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
