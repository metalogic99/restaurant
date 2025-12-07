"use client";
import { useGetCategories } from "@/hooks/category.hooks";
import React, { useEffect, useMemo, useState } from "react";
import MenuComponent from "./MenuComponent";

const imageBase = "/guest/menu";

const productImages = {
  "Appetizers and Snacks": {
    "Potato Varieties": [`${imageBase}/fries.png`, `${imageBase}/pakooda.png`],
    "Pakoda Platter": [`${imageBase}/pakooda.png`],
    Snacks: [`${imageBase}/onion-rings.png`, `${imageBase}/paneerChilly.png`],
    "Street Food Favourites": [
      `${imageBase}/samosa.png`,
      `${imageBase}/spring-roll.png`,
      `${imageBase}/panipuri.png`,
    ],
    "Traditional & Nepali Snacks": [
      `${imageBase}/chatpate.png`,
      `${imageBase}/mushroomChoila.png`,
      `${imageBase}/aalonimki.png`,
    ],
    "Light Bites": [
      `${imageBase}/popcornFinal.png`,
      `${imageBase}/dynamiteRoll.png`,
    ],
    "Snacks & Street Classics": [
      `${imageBase}/chipsChilly.png`,
      `${imageBase}/honeychilly.png`,
      `${imageBase}/breadPakoda.png`,
    ],
  },
  "Main Course": {
    "MO:MO (Nepali Dumplings)": [
      `${imageBase}/momof.png`,
      `${imageBase}/momof.png`,
      `${imageBase}/momof.png`,
      `${imageBase}/momof.png`,
    ],
    "Noodles & Rice": [
      `${imageBase}/chowmein.png`,
      `${imageBase}/thukpa.png`,
      `${imageBase}/rice.png`,
    ],
    "Curries and Sabji": [
      `${imageBase}/palak.png`,
      `${imageBase}/paneerMasala.png`,
      `${imageBase}/daalTadka.png`,
      `${imageBase}/mushCurry.png`,
      `${imageBase}/aaloo65.png`,
      `${imageBase}/sauted.png`,
    ],
    Breads: [`${imageBase}/roti.png`],
    "Nepali and Indian Set Meals": [
      `${imageBase}/thali.png`,
      `${imageBase}/dhindo.png`,
      `${imageBase}/kanchamba.png`,
      `${imageBase}/fapar.png`,
    ],
    "Rice & Sides": [
      `${imageBase}/jeera.png`,
      `${imageBase}/pappad.png`,
      `${imageBase}/spaghetti.png`,
    ],
    Soups: [`${imageBase}/soup1.png`, `${imageBase}/soup2.png`],
  },
  Deserts: {
    Deserts: [`${imageBase}/halwa.png`, `${imageBase}/ice.png`],
  },
  Pizza: {
    Pizza: [`${imageBase}/pizza2.png`, `${imageBase}/pizza.png`],
  },
  Salads: { Salads: [`${imageBase}/salad2.png`, `${imageBase}/ysalad.png`] },
  Pasta: { Pasta: [`${imageBase}/pasta.png`] },
  Breakfast: {
    Breakfast: [
      `${imageBase}/jam.png`,
      `${imageBase}/corntoast.png`,
      `${imageBase}/curdf.png`,
    ],
  },
  "PREMIUM VEG DINNER MENU": {
    "Global & Signatures Specials": [
      `${imageBase}/dreamy.png`,
      `${imageBase}/ramen.png`,
      `${imageBase}/pannerKaliMirch.png`,
      `${imageBase}/galouti.png`,
      `${imageBase}/cauliflower.png`,
      `${imageBase}/patatas.png`,
      `${imageBase}/karela.png`,
      `${imageBase}/burrito.png`,
    ],
  },
  Coffee: {
    "Brewed Coffee": [
      `${imageBase}/cfe.png`,
      `${imageBase}/gahwa.png`,

      `${imageBase}/brew.png`,
    ],
    "Espresso Classics": [
      `${imageBase}/solo.png`,
      `${imageBase}/americano.png`,
      `${imageBase}/latte.png`,
    ],
    "Signature Espresso Creations": [`${imageBase}/madness.png`],
    "Iced & Blended Beverages": [
      `${imageBase}/iceLatte.png`,
      `${imageBase}/frape.png`,
      `${imageBase}/icecap.png`,
    ],
    "Coffee Alternatives & Tea": [
      `${imageBase}/milk.png`,
      `${imageBase}/blck.png`,
      `${imageBase}/cold.png`,
      `${imageBase}/masala.png`,
      `${imageBase}/belgium.png`,
      `${imageBase}/chamo.png`,
      `${imageBase}/season.png`,
      `${imageBase}/lemonade.png`,
    ],
  },
  Mocktails: {
    "Mocktails & Signature Refresher": [
      `${imageBase}/blueberry.png`,
      `${imageBase}/pinkPortion.png`,
      `${imageBase}/berry.png`,
      `${imageBase}/cindrella.png`,
    ],
  },
  "Our Signatures": {
    Signatures: [`${imageBase}/gold.png`],
  },
} as const;

const CategoriesSectionDesktop = () => {
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
      (category) => category.name.trim() === selectedCategory
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
    <section className="max-w-4xl mx-auto font-inter px-2 md:px-0">
      <section className="">
        <div className="flex gap-4 justify-center mb-5 flex-wrap">
          {menuData &&
            menuData.map((item) => (
              <button
                key={item._id}
                onClick={() => setSelectedCategory(item.name.trim())}
                className={` text-white ${
                  item.name.trim() === selectedCategory
                    ? "bg-orange"
                    : "bg-orange/70"
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
