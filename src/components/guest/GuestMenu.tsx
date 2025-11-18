"use client";
import { useGetCategories } from "@/hooks/category.hooks";
import React, { useEffect, useMemo, useState } from "react";

const GuestMenu = () => {
  const { data } = useGetCategories();

  const menuData = useMemo(() => {
    return data ? data : [];
  }, [data]);
  console.log("menu data obtained is", menuData);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  useEffect(() => {
    setSelectedCategory(menuData.length > 0 ? menuData[0].name : "");
  }, [menuData]);

  console.log(selectedCategory);

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
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-forestGreen mb-4">Menu</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {menuData.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedCategory === category.name
                ? "bg-forestGreen text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {subCategories.map((subCategory) => (
            <button
              key={subCategory._id}
              onClick={() => setSelectedSubCategory(subCategory.name)}
              className={`px-4 py-2 rounded-full ${
                selectedSubCategory === subCategory.name
                  ? "bg-forestGreen text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {subCategory.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 my-1">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">Rs. {product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestMenu;
