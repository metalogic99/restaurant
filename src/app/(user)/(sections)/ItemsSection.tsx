// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import ProductCard from "@/components/order/ProductCard";
// import { useGetCategories } from "@/hooks/category.hooks";
// import Loading from "@/components/shared/Loading";
// import AdminError from "@/components/admin/AdminError";

// const ItemsSection = ({ tableId }: { tableId: string }) => {
//   const { data, error, isLoading } = useGetCategories();
//   const [category, setCategory] = useState(() => {
//     if (!data) {
//       return "Appetizers and Snacks";
//     } else {
//       return data[0].name;
//     }
//   });

//   const filteredFromCategory = useMemo(() => {
//     return data
//       ?.map((data) => {
//         if (data.name === category) {
//           return data.subCategories;
//         }
//       })
//       .filter((item) => item)[0];
//   }, [category, data]);

//   useEffect(() => {
//     if (data) setCategory(data[0].name);
//   }, [data]);

//   useEffect(() => {
//     setSubCategory(() => {
//       if (!filteredFromCategory) {
//         return "none";
//       } else {
//         return filteredFromCategory[0].name;
//       }
//     });
//   }, [filteredFromCategory]);

//   const [subCategory, setSubCategory] = useState<string>(() => {
//     if (!filteredFromCategory) {
//       return "none";
//     } else {
//       return filteredFromCategory[0].name;
//     }
//   });

//   const filteredFromSubCategory = useMemo(() => {
//     if (!filteredFromCategory) {
//       return [];
//     } else {
//       return filteredFromCategory
//         .map((data) => {
//           if (data.name === subCategory) {
//             return data.products;
//           }
//         })
//         .filter((item) => item)[0];
//     }
//   }, [filteredFromCategory, subCategory]);

//   if (isLoading) {
//     return (
//       <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
//         <Loading />
//       </section>
//     );
//   }
//   if (error) {
//     return (
//       <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
//         <AdminError error={error.message} />
//       </section>
//     );
//   }

//   if (!data) {
//     return (
//       <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
//         <AdminError error="Error fetching products" />
//       </section>
//     );
//   }

//   return (
//     <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
//       <div className="w-full flex flex-col gap-3 sm:gap-4">
//         <div className="w-full flex flex-col gap-3 sm:gap-4">
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
//             <div className="flex flex-col xs:flex-row xs:items-center gap-2 flex-1 min-w-0">
//               <span className="text-sm sm:text-lg lg:text-xl font-semibold text-forestGreen whitespace-nowrap">
//                 Category
//               </span>
//               <select
//                 defaultValue={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full xs:w-auto xs:min-w-[140px] sm:min-w-[160px] h-9 sm:h-10 lg:h-11 px-2 sm:px-3 border border-mintGreen rounded-md focus:border-mintGreen focus:ring-0 outline-none text-sm sm:text-base"
//               >
//                 {data?.map((c) => (
//                   <option key={c._id} value={c.name}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col xs:flex-row xs:items-center gap-2 flex-1 min-w-0">
//               <span className="text-sm sm:text-lg lg:text-xl font-semibold text-forestGreen whitespace-nowrap">
//                 Sub-Category
//               </span>
//               <select
//                 value={subCategory}
//                 onChange={(e) => setSubCategory(e.target.value)}
//                 className="w-full xs:w-auto xs:min-w-[140px] sm:min-w-[160px] h-9 sm:h-10 lg:h-11 px-2 sm:px-3 border border-mintGreen rounded-md focus:border-mintGreen focus:ring-0 outline-none text-sm sm:text-base"
//               >
//                 {filteredFromCategory?.map((sc) => (
//                   <option key={sc._id} value={sc.name}>
//                     {sc.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 sm:mt-6 lg:mt-8">
//         {!filteredFromCategory ? (
//           <div className="text-center py-8 sm:py-12">
//             <p className="text-gray-500 text-sm sm:text-base">
//               No category selected
//             </p>
//           </div>
//         ) : (
//           <div>
//             <div className="bg-brown border-y-2 border-[#1c2b22] px-3 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-center text-center relative overflow-hidden">
//               <div className="flex flex-col items-center justify-center flex-1">
//                 <h2 className="flex flex-col xs:flex-row xs:gap-2 text-base sm:text-lg lg:text-xl font-semibold italic text-[#1c2b22]">
//                   <span className="break-words">{category}</span>
//                   <span className="hidden xs:inline">|</span>
//                   <span className="break-words">{subCategory}</span>
//                 </h2>
//               </div>
//             </div>

//             {!filteredFromSubCategory ||
//             filteredFromSubCategory.length === 0 ? (
//               <div className="text-center py-8 sm:py-12">
//                 <p className="text-gray-500 text-sm sm:text-base">
//                   No products available
//                 </p>
//               </div>
//             ) : (
//               <div className="mt-4 sm:mt-6">
//                 <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
//                   {filteredFromSubCategory.map((product) => (
//                     <ProductCard
//                       key={product._id}
//                       product={product}
//                       tableId={tableId}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ItemsSection;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/order/ProductCard";
import { useGetCategories } from "@/hooks/category.hooks";
import Loading from "@/components/shared/Loading";
import AdminError from "@/components/admin/AdminError";

const ItemsSection = ({ tableId }: { tableId: string }) => {
  const { data, error, isLoading } = useGetCategories();

  // States
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //  Debounce Logic for Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Sync initial category data
  useEffect(() => {
    if (data && data.length > 0 && !category) {
      setCategory(data[0].name);
    }
  }, [data, category]);

  // Sync subcategory when category changes (only if not searching)
  useEffect(() => {
    const currentCat = data?.find((c) => c.name === category);
    if (currentCat?.subCategories?.length) {
      setSubCategory(currentCat.subCategories[0].name);
    }
  }, [category, data]);

  // 2. GLOBAL SEARCH & FILTER LOGIC
  const displayProducts = useMemo(() => {
    if (!data) return [];

    // If there is a search term, search across ALL categories and ALL subcategories
    if (debouncedSearch.trim() !== "") {
      const query = debouncedSearch.toLowerCase();
      const results: any[] = [];

      data.forEach((cat) => {
        cat.subCategories.forEach((sub) => {
          sub.products.forEach((prod: any) => {
            if (prod.name.toLowerCase().includes(query)) {
              results.push(prod);
            }
          });
        });
      });
      // Filter out duplicates (if a product exists in multiple places)
      return Array.from(new Map(results.map((p) => [p._id, p])).values());
    }

    // Otherwise, show products based on selected Category and Sub-Category
    const currentCat = data.find((c) => c.name === category);
    const currentSub = currentCat?.subCategories?.find(
      (sc) => sc.name === subCategory,
    );

    return currentSub?.products || [];
  }, [data, category, subCategory, debouncedSearch]);

  if (isLoading)
    return (
      <section className="w-full lg:w-1/2 px-4">
        <Loading />
      </section>
    );
  if (error || !data)
    return (
      <section className="w-full lg:w-1/2 px-4">
        <AdminError error={error?.message || "Error"} />
      </section>
    );

  const currentSubCategories =
    data.find((c) => c.name === category)?.subCategories || [];

  return (
    <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0">
      <div className="w-full flex flex-col gap-4">
        {/* 1. Global Search Bar */}
        <div className="w-full">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search all items (e.g. 'potato')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 px-4 py-2 border-2 border-mintGreen rounded-lg focus:border-forestGreen focus:ring-2 focus:ring-forestGreen/10 outline-none transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-forestGreen font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 2. Filters (Disabled/Faded if searching) */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-opacity ${searchTerm ? "opacity-40 pointer-events-none" : "opacity-100"}`}
        >
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs font-bold text-forestGreen uppercase">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-2 border border-mintGreen rounded-md outline-none text-sm"
            >
              {data.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <span className="text-xs font-bold text-forestGreen uppercase">
              Sub-Category
            </span>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full h-10 px-2 border border-mintGreen rounded-md outline-none text-sm"
            >
              {currentSubCategories.map((sc) => (
                <option key={sc._id} value={sc.name}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {/* Status Header */}
        <div className="bg-brown border-y-2 border-[#1c2b22] py-3 flex flex-col items-center shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold italic text-[#1c2b22] uppercase tracking-wider">
            {searchTerm
              ? `Searching for: ${searchTerm}`
              : `${category} | ${subCategory}`}
          </h2>
        </div>

        {/* Results Grid */}
        <div className="mt-6">
          {displayProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">
                No products found matching your request.
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-forestGreen underline text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  tableId={tableId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemsSection;
