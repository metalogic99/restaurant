"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/order/ProductCard";
import { useGetCategories } from "@/hooks/category.hooks";
import Loading from "@/components/shared/Loading";
import AdminError from "@/components/admin/AdminError";

const ItemsSection = ({ tableId }: { tableId: string }) => {
  const { data, error, isLoading } = useGetCategories();
  const [category, setCategory] = useState(() => {
    if (!data) {
      return "Appetizers and Snacks";
    } else {
      return data[0].name;
    }
  });

  const filteredFromCategory = useMemo(() => {
    return data
      ?.map((data) => {
        if (data.name === category) {
          return data.subCategories;
        }
      })
      .filter((item) => item)[0];
  }, [category, data]);

  useEffect(() => {
    if (data) setCategory(data[0].name);
  }, [data]);

  useEffect(() => {
    setSubCategory(() => {
      if (!filteredFromCategory) {
        return "none";
      } else {
        return filteredFromCategory[0].name;
      }
    });
  }, [filteredFromCategory]);

  const [subCategory, setSubCategory] = useState<string>(() => {
    if (!filteredFromCategory) {
      return "none";
    } else {
      return filteredFromCategory[0].name;
    }
  });

  const filteredFromSubCategory = useMemo(() => {
    if (!filteredFromCategory) {
      return [];
    } else {
      return filteredFromCategory
        .map((data) => {
          if (data.name === subCategory) {
            return data.products;
          }
        })
        .filter((item) => item)[0];
    }
  }, [filteredFromCategory, subCategory]);

  if (isLoading) {
    return (
      <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
        <Loading />
      </section>
    );
  }
  if (error) {
    return (
      <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
        <AdminError error={error.message} />
      </section>
    );
  }

  if (!data) {
    return (
      <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
        <AdminError error="Error fetching products" />
      </section>
    );
  }

  return (
    <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 flex-1 min-w-0">
              <span className="text-sm sm:text-lg lg:text-xl font-semibold text-forestGreen whitespace-nowrap">
                Category
              </span>
              <select
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full xs:w-auto xs:min-w-[140px] sm:min-w-[160px] h-9 sm:h-10 lg:h-11 px-2 sm:px-3 border border-mintGreen rounded-md focus:border-mintGreen focus:ring-0 outline-none text-sm sm:text-base"
              >
                {data?.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center gap-2 flex-1 min-w-0">
              <span className="text-sm sm:text-lg lg:text-xl font-semibold text-forestGreen whitespace-nowrap">
                Sub-Category
              </span>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full xs:w-auto xs:min-w-[140px] sm:min-w-[160px] h-9 sm:h-10 lg:h-11 px-2 sm:px-3 border border-mintGreen rounded-md focus:border-mintGreen focus:ring-0 outline-none text-sm sm:text-base"
              >
                {filteredFromCategory?.map((sc) => (
                  <option key={sc._id} value={sc.name}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 lg:mt-8">
        {!filteredFromCategory ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">
              No category selected
            </p>
          </div>
        ) : (
          <div>
            <div className="bg-brown border-y-2 border-[#1c2b22] px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-center text-center relative overflow-hidden">
              <div className="flex flex-col items-center justify-center flex-1">
                <h2 className="flex flex-col xs:flex-row xs:gap-2 text-base sm:text-lg lg:text-xl font-semibold italic text-[#1c2b22]">
                  <span className="break-words">{category}</span>
                  <span className="hidden xs:inline">|</span>
                  <span className="break-words">{subCategory}</span>
                </h2>
              </div>
            </div>

            {!filteredFromSubCategory ||
            filteredFromSubCategory.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  No products available
                </p>
              </div>
            ) : (
              <div className="mt-4 sm:mt-6">
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {filteredFromSubCategory.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      tableId={tableId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemsSection;
