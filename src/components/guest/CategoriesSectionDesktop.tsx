"use client";
import { useGetCategories } from "@/hooks/category.hooks";
import React, { useEffect, useMemo, useState } from "react";
import MenuComponent from "./MenuComponent";

// const productImages = {
//   "Appetizers and Snacks": {
//     "Potato Varieties": ["image1.jpg", "image2.jpg"],
//     "Pakoda Platter": ["image1.jpg", "image2.jpg"],
//     Snacks: ["image1.jpg", "image2.jpg"],
//     "Street Food Favourites": ["image1.jpg", "image2.jpg"],
//     "Traditional & Nepali Snacks": ["image1.jpg", "image2.jpg"],
//     "Light Bites": ["image1.jpg", "image2.jpg"],
//   },
//   "Main Course": {
//     "MO:MO (Nepali Dumplings)": ["image1.jpg", "image2.jpg"],
//     "Noodles & Rice": ["image1.jpg", "image2.jpg"],
//     "Curries and Sabji": ["image1.jpg", "image2.jpg"],
//     Breads: ["image1.jpg", "image2.jpg"],
//     "Nepali and Indian Set Meals": ["image1.jpg", "image2.jpg"],
//     "Rice & Sides": ["image1.jpg", "image2.jpg"],
//     Soups: ["image1.jpg", "image2.jpg"],
//   },
//   Deserts: {
//     Deserts: ["image1.jpg", "image2.jpg"],
//   },
//   Pizza: {
//     Pizza: ["image1.jpg", "image2.jpg"],
//   },
//   Salads: {
//     Salads: ["image1.jpg", "image2.jpg"],
//   },
//   Pasta: {
//     Pasta: ["image1.jpg", "image2.jpg"],
//   },
//   Breakfast: {
//     Breakfast: ["image1.jpg", "image2.jpg"],
//   },
// };

const imageBase = "/guest/menu";

const productImages = {
  "Appetizers and Snacks": {
    "Potato Varieties": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    "Pakoda Platter": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    Snacks: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    "Street Food Favourites": [
      `${imageBase}/fries.png`,
      `${imageBase}/pakooda.png`,
    ],
    "Traditional & Nepali Snacks": [
      `${imageBase}/fries.png`,
      `${imageBase}/pakooda.png`,
    ],
    "Light Bites": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
  },
  "Main Course": {
    "MO:MO (Nepali Dumplings)": [
      `${imageBase}/fries.png`,
      `${imageBase}/pakooda.png`,
    ],
    "Noodles & Rice": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    "Curries and Sabji": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    Breads: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    "Nepali and Indian Set Meals": [
      `${imageBase}/fries.png`,
      `${imageBase}/pakooda.png`,
    ],
    "Rice & Sides": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    Soups: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
  },
  Deserts: {
    Deserts: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
  },
  Pizza: { Pizza: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`] },
  Salads: { Salads: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`] },
  Pasta: { Pasta: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`] },
  Breakfast: {
    Breakfast: [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
  },
} as const;

const CategoriesSectionDesktop = () => {
  //   const [selectedCategory, setSelectedCategory] = useState<string>(
  //     categories[0]
  //   );

  const { data } = useGetCategories();

  const menuData = useMemo(() => {
    return data ? data : [];
  }, [data]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  useEffect(() => {
    setSelectedCategory(menuData.length > 0 ? menuData[0].name : "");
  }, [menuData]);

  const subCategories = useMemo(() => {
    if (menuData.length === 0) {
      return [];
    }
    const filteredCategory = menuData.filter(
      (category) => category.name === selectedCategory
    );
    if (filteredCategory.length > 0) {
      if (filteredCategory[0].subCategories.length > 0) {
        setSelectedSubCategory(filteredCategory[0].subCategories[0].name);
      }
      return filteredCategory[0].subCategories;
    }
    return [];
  }, [menuData, selectedCategory]);

  const products = useMemo(() => {
    if (subCategories.length === 0) {
      return [];
    }
    const filteredSubCategory = subCategories.filter(
      (subCategory) => subCategory.name === selectedSubCategory
    );
    if (filteredSubCategory.length > 0) {
      return filteredSubCategory[0].products;
    }
    return [];
  }, [subCategories, selectedSubCategory]);

  return (
    <section className="max-w-3xl  mx-auto font-inter px-2 md:px-0">
      <section className="">
        <div className="flex gap-4 justify-center mb-5 flex-wrap">
          {menuData &&
            menuData.map((item) => (
              <button
                key={item._id}
                onClick={() => setSelectedCategory(item.name)}
                className={` text-white ${
                  item.name === selectedCategory ? "bg-orange" : "bg-orange/70"
                } px-4 py-2 rounded-md text-sm tracking-wide font-medium shrink-0 `}
              >
                {item.name}
              </button>
            ))}
        </div>

        <div className="flex justify-center gap-6 text-sm text-gray-500 mb-10 flex-wrap">
          {subCategories.map((item, i) => (
            <span
              onClick={() => setSelectedSubCategory(item.name)}
              key={i}
              className={`cursor-pointer shrink-0 ${
                item.name === selectedSubCategory
                  ? "relative text-black font-medium after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:bg-orange after:w-full after:-translate-x-1/2 after:transition-all after:duration-300"
                  : "text-gray-500"
              }
              `}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* <div className="grid grid-cols-2 gap-y-16"> */}
        {/* <div>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">French Fries</h3>
              <p className="font-semibold text-lg">200</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Golden, crispy potato slices seasoned with salt, served with
              ketchup or mayo.
            </p>

            <div className="flex justify-between items-start mt-6">
              <h3 className="font-semibold text-lg">Spicy Potato</h3>
              <p className="font-semibold text-lg">170</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Thick-cut potato wedges with a crunchy coating, served with spicy
              mayo.
            </p>

            <div className="flex justify-between items-start mt-6">
              <h3 className="font-semibold text-lg">Mustang Aloo</h3>
              <p className="font-semibold text-lg">230</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Thinly sliced potatoes sautéed with traditional Himalayan spices.
            </p>
          </div> */}

        {/* <div className="flex justify-center">
            <img
              src="/your-image-path-1.png"
              alt="Pakoda Platter"
              className="w-60 h-60 object-cover rounded-full"
            />
          </div> */}

        {/* Second Set */}
        {/* <div className="flex justify-center">
            <img
              src="/your-image-path-2.png"
              alt="Pakoda Platter"
              className="w-60 h-60 object-cover rounded-full"
            />
          </div> */}

        {/* <div>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">French Fries</h3>
              <p className="font-semibold text-lg">200</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Golden, crispy potato slices seasoned with salt, served with
              ketchup or mayo.
            </p>

            <div className="flex justify-between items-start mt-6">
              <h3 className="font-semibold text-lg">Spicy Potato</h3>
              <p className="font-semibold text-lg">170</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Thick-cut potato wedges with a crunchy coating, served with spicy
              mayo.
            </p>

            <div className="flex justify-between items-start mt-6">
              <h3 className="font-semibold text-lg">Mustang Aloo</h3>
              <p className="font-semibold text-lg">230</p>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Thinly sliced potatoes sautéed with traditional Himalayan spices.
            </p>
          </div> */}
        {/* </div> */}
        <MenuComponent
          products={products}
          images={
            selectedCategory && selectedSubCategory
              ? (productImages as any)[selectedCategory]?.[
                  selectedSubCategory
                ] ?? []
              : []
          }
        />
      </section>
    </section>
  );
};

export default CategoriesSectionDesktop;
