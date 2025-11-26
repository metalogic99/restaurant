// import Image from "next/image";
// import { motion } from "framer-motion";

// const MenuComponent = ({
//   products,
//   images,
// }: {
//   products: Product[];
//   images: string[];
// }) => {
//   // Function to chunk array into groups of 3
//   const chunkProducts = (arr: Product[], size: number) => {
//     return arr.reduce((chunks: Product[][], item, idx) => {
//       if (idx % size === 0) chunks.push([item]);
//       else chunks[chunks.length - 1].push(item);
//       return chunks;
//     }, []);
//   };

//   const productGroups: Product[][] = chunkProducts(products, 3);

//   console.log("images are", images);

//   return (
//     <section className="w-full mx-auto py-10 font-inter">
//       {productGroups.map((group, index) => (
//         <div
//           key={index}
//           className={`flex flex-row items-center mb-16 ${
//             index % 2 === 0 ? "" : "flex-row-reverse"
//           }`}
//         >
//           <div className="w-1/2">
//             {group.map((product, i) => (
//               <div key={i} className={i !== 0 ? "mt-6" : ""}>
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold">{product.name}</h3>
//                   <p className="font-bold">{product.price}</p>
//                 </div>
//                 <p className="text-gray-500 text-sm max-w-xs mt-1">
//                   {product.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center w-1/2">
//             {/* <motion.div
//               initial={{
//                 x: index % 2 === 0 ? 100 : -100, // left or right
//                 rotate: index % 2 === 0 ? 15 : -15, // initial rotation
//                 opacity: 0,
//               }}
//               whileInView={{
//                 x: 0,
//                 rotate: 0,
//                 opacity: 1,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 70,
//                 damping: 12,
//                 mass: 0.6,
//               }}
//               viewport={{ once: true, amount: 0.4 }}
//             >
//               <Image
//                 src={images[index] ? images[index] : "/fallbackImage.png"}
//                 alt={group[0]?.name || "Dish Image"}
//                 width={240}
//                 height={240}
//                 className="rounded-full object-cover w-60 h-60"
//               />
//             </motion.div> */}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default MenuComponent;

import Image from "next/image";
import { motion } from "framer-motion";

const MenuComponent = ({
  products,
  images,
}: {
  products: Product[];
  images: string[];
}) => {
  const chunkProducts = (arr: Product[], size: number) => {
    return arr.reduce((chunks: Product[][], item, idx) => {
      if (idx % size === 0) chunks.push([item]);
      else chunks[chunks.length - 1].push(item);
      return chunks;
    }, []);
  };

  const productGroups: Product[][] = chunkProducts(products, 3);

  return (
    <section className="w-full mx-auto py-10 font-inter">
      {productGroups.map((group, index) => (
        <div
          key={index}
          className={`flex flex-row items-center mb-6 md:mb-16 gap-10 ${
            index % 2 === 0 ? "" : "flex-row-reverse"
          }`}
        >
          <div className="md:w-1/2 w-full">
            {group.map((product, i) => (
              <div key={i} className={i !== 0 ? "mt-6" : ""}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="font-bold">{product.price}</p>
                </div>
                <p className="text-gray-500 text-sm max-w-xs mt-1">
                  {product.description}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden justify-center items-center md:flex md:w-1/2">
            <motion.div
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 140 : -140,
                y: -110,
                rotate: index % 2 === 0 ? 30 : -30,
              }}
              whileInView={{
                opacity: 1,
                x: [index % 2 === 0 ? 140 : -140, 0],
                y: [-110, 0],
                rotate: [index % 2 === 0 ? 30 : -30, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={images[index] ? images[index] : "/fallbackImage.png"}
                alt={group[0]?.name || "Dish Image"}
                width={240}
                height={240}
                className="rounded-full object-cover w-72 h-72"
              />
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuComponent;
