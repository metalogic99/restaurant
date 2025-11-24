// // // "use client";
// // // import { useState } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // const COLORS = ["bg-white", "bg-yellow-400", "bg-red-500"];
// // // const TEXT_COLORS = ["text-gray-800", "text-gray-800", "text-white"];

// // // const testimonials = [
// // //   {
// // //     text: "At Addifico Consulting, we use human creativity and the latest technologies to help business leaders, investors, and entrepreneurs enhance their market positioning, discover the next...",
// // //     author: "Milton Zahino",
// // //     role: "Behavioral Science",
// // //   },
// // //   {
// // //     text: "We combine design thinking and psychology to create solutions that resonate with users and drive meaningful engagement across all touchpoints.",
// // //     author: "John Miller",
// // //     role: "Product Specialist",
// // //   },
// // //   {
// // //     text: "Helping organizations grow through innovation and strategic thinking. Our approach transforms challenges into opportunities for sustainable growth.",
// // //     author: "Sarah Lopez",
// // //     role: "Strategy Consultant",
// // //   },
// // // ];

// // // export default function TestimonialCarousel() {
// // //   const [index, setIndex] = useState(0);

// // //   const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
// // //   const prev = () =>
// // //     setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

// // //   // Calculate the color sequence for the stack
// // //   const getStackColors = () => {
// // //     return [
// // //       COLORS[index % 3], // Top card (current)
// // //       COLORS[(index + 2) % 3], // Middle card (previous)
// // //       COLORS[(index + 1) % 3], // Bottom card (next in sequence)
// // //     ];
// // //   };

// // //   const stackColors = getStackColors();

// // //   return (
// // //     <div className="relative flex items-center justify-center min-h-[500px] w-full gap-8 px-4">
// // //       <button
// // //         onClick={prev}
// // //         className="text-4xl font-bold text-gray-600 hover:text-gray-900 transition-colors z-20"
// // //       >
// // //         &lt;
// // //       </button>

// // //       <div className="relative w-[380px] h-[420px]">
// // //         {[2, 1].map((layer) => (
// // //           <motion.div
// // //             key={`bg-${layer}-${index}`}
// // //             initial={{
// // //               y: layer === 1 ? 15 : 30,
// // //               opacity: layer === 1 ? 0.7 : 0.4,
// // //               scale: layer === 1 ? 0.95 : 0.9,
// // //               rotateY: layer === 1 ? -5 : -10,
// // //             }}
// // //             animate={{
// // //               y: layer === 1 ? 15 : 30,
// // //               opacity: layer === 1 ? 0.7 : 0.4,
// // //               scale: layer === 1 ? 0.95 : 0.9,
// // //               rotateY: layer === 1 ? -5 : -10,
// // //             }}
// // //             transition={{ duration: 0.5, delay: layer * 0.1 }}
// // //             className={`absolute inset-0 rounded-2xl shadow-xl ${stackColors[layer]} border`}
// // //             style={{
// // //               zIndex: layer,
// // //               transformOrigin: "center bottom",
// // //             }}
// // //           />
// // //         ))}

// // //         <AnimatePresence mode="popLayout">
// // //           <motion.div
// // //             key={index}
// // //             initial={{
// // //               opacity: 0,
// // //               y: 50,
// // //               scale: 0.9,
// // //               rotateY: 10,
// // //             }}
// // //             animate={{
// // //               opacity: 1,
// // //               y: 0,
// // //               scale: 1,
// // //               rotateY: 0,
// // //             }}
// // //             exit={{
// // //               opacity: 0,
// // //               y: -50,
// // //               scale: 1.1,
// // //               rotateY: -10,
// // //             }}
// // //             transition={{ duration: 0.6, ease: "easeOut" }}
// // //             className={`absolute inset-0 rounded-2xl shadow-2xl p-8 flex flex-col justify-between ${stackColors[0]} border`}
// // //             style={{ zIndex: 3 }}
// // //           >
// // //             <div>
// // //               <p
// // //                 className={`text-lg leading-relaxed ${TEXT_COLORS[index % 3]}`}
// // //               >
// // //                 {testimonials[index].text}
// // //               </p>
// // //               <button
// // //                 className={`mt-6 font-semibold ${
// // //                   TEXT_COLORS[index % 3]
// // //                 } hover:underline transition-all flex items-center gap-1`}
// // //               >
// // //                 Read More <span className="text-xl">→</span>
// // //               </button>
// // //             </div>

// // //             <div className="mt-8 border-t pt-6 flex items-center gap-4">
// // //               <div
// // //                 className={`w-12 h-12 rounded-full ${
// // //                   TEXT_COLORS[index % 3]
// // //                 } bg-opacity-20 flex items-center justify-center font-semibold`}
// // //               >
// // //                 {testimonials[index].author.charAt(0)}
// // //               </div>
// // //               <div>
// // //                 <div className={`font-bold text-lg ${TEXT_COLORS[index % 3]}`}>
// // //                   {testimonials[index].author}
// // //                 </div>
// // //                 <div className={`text-sm ${TEXT_COLORS[index % 3]} opacity-80`}>
// // //                   {testimonials[index].role}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </AnimatePresence>
// // //       </div>

// // //       <button
// // //         onClick={next}
// // //         className="text-4xl font-bold text-gray-600 hover:text-gray-900 transition-colors z-20"
// // //       >
// // //         &gt;
// // //       </button>

// // //       {/* Dots Indicator */}
// // //       <div className="absolute bottom-4 flex gap-2 z-20">
// // //         {testimonials.map((_, i) => (
// // //           <button
// // //             key={i}
// // //             onClick={() => setIndex(i)}
// // //             className={`w-3 h-3 rounded-full transition-all ${
// // //               i === index ? "bg-gray-800 scale-110" : "bg-gray-300"
// // //             }`}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // const COLORS = ["bg-white", "bg-yellow-400", "bg-red-500"];
// // const TEXT_COLORS = ["text-gray-800", "text-gray-800", "text-white"];

// // const testimonials = [
// //   {
// //     text: "At Addifico Consulting, we use human creativity and the latest technologies to help business leaders, investors, and entrepreneurs enhance their market positioning, discover the next...",
// //     author: "Milton Zahino",
// //     role: "Behavioral Science",
// //   },
// //   {
// //     text: "We combine design thinking and psychology to create solutions that resonate with users and drive meaningful engagement across all touchpoints.",
// //     author: "John Miller",
// //     role: "Product Specialist",
// //   },
// //   {
// //     text: "Helping organizations grow through innovation and strategic thinking. Our approach transforms challenges into opportunities for sustainable growth.",
// //     author: "Sarah Lopez",
// //     role: "Strategy Consultant",
// //   },
// // ];

// // export default function TestimonialCarousel() {
// //   const [index, setIndex] = useState(0);

// //   const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
// //   const prev = () =>
// //     setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

// //   const getVisibleCards = () => {
// //     const cards = [];
// //     const total = testimonials.length;

// //     // Previous card (left)
// //     const prevIndex = (index - 1 + total) % total;
// //     cards.push({
// //       index: prevIndex,
// //       position: "left",
// //       color: COLORS[(prevIndex + 2) % 3],
// //       zIndex: 1,
// //       transform: {
// //         x: -80,
// //         y: 20,
// //         scale: 0.85,
// //         rotateY: 15,
// //         opacity: 0.6,
// //       },
// //     });

// //     cards.push({
// //       index: index,
// //       position: "center",
// //       color: COLORS[index % 3],
// //       zIndex: 3,
// //       transform: {
// //         x: 0,
// //         y: 0,
// //         scale: 1,
// //         rotateY: 0,
// //         opacity: 1,
// //       },
// //     });

// //     // Next card (right)
// //     const nextIndex = (index + 1) % total;
// //     cards.push({
// //       index: nextIndex,
// //       position: "right",
// //       color: COLORS[(nextIndex + 1) % 3],
// //       zIndex: 1,
// //       transform: {
// //         x: 80,
// //         y: 20,
// //         scale: 0.85,
// //         rotateY: -15,
// //         opacity: 0.6,
// //       },
// //     });

// //     return cards;
// //   };

// //   const visibleCards = getVisibleCards();

// //   return (
// //     <div className="relative flex items-center justify-center min-h-[500px] w-full gap-4 px-8">
// //       <button
// //         onClick={prev}
// //         className="text-4xl font-bold text-gray-600 hover:text-gray-900 transition-colors z-20"
// //       >
// //         &lt;
// //       </button>

// //       <div className="relative w-[420px] h-[420px] flex items-center justify-center">
// //         <AnimatePresence mode="popLayout">
// //           {visibleCards.map((card) => (
// //             <motion.div
// //               key={`${card.position}-${card.index}`}
// //               initial={{
// //                 x: card.transform.x,
// //                 y: card.transform.y,
// //                 scale: card.transform.scale,
// //                 rotateY: card.transform.rotateY,
// //                 opacity: card.transform.opacity,
// //               }}
// //               animate={{
// //                 x: card.transform.x,
// //                 y: card.transform.y,
// //                 scale: card.transform.scale,
// //                 rotateY: card.transform.rotateY,
// //                 opacity: card.transform.opacity,
// //               }}
// //               exit={{
// //                 x:
// //                   card.position === "left"
// //                     ? -100
// //                     : card.position === "right"
// //                     ? 100
// //                     : 0,
// //                 opacity: 0,
// //                 scale: 0.8,
// //               }}
// //               transition={{
// //                 duration: 0.5,
// //                 ease: "easeOut",
// //                 opacity: { duration: 0.3 },
// //               }}
// //               className={`absolute rounded-2xl shadow-xl p-8 flex flex-col justify-between ${card.color} border cursor-pointer`}
// //               style={{
// //                 zIndex: card.zIndex,
// //                 transformOrigin: "center bottom",
// //                 width: "380px",
// //                 height: "420px",
// //               }}
// //               onClick={() => {
// //                 if (card.position !== "center") {
// //                   setIndex(card.index);
// //                 }
// //               }}
// //             >
// //               <div>
// //                 <p
// //                   className={`text-lg leading-relaxed ${
// //                     TEXT_COLORS[card.index % 3]
// //                   }`}
// //                 >
// //                   {testimonials[card.index].text}
// //                 </p>
// //                 <button
// //                   className={`mt-6 font-semibold ${
// //                     TEXT_COLORS[card.index % 3]
// //                   } hover:underline transition-all flex items-center gap-1`}
// //                 >
// //                   Read More <span className="text-xl">→</span>
// //                 </button>
// //               </div>

// //               <div className="mt-8 border-t pt-6 flex items-center gap-4">
// //                 <div
// //                   className={`w-12 h-12 rounded-full ${
// //                     TEXT_COLORS[card.index % 3]
// //                   } bg-opacity-20 flex items-center justify-center font-semibold`}
// //                 >
// //                   {testimonials[card.index].author.charAt(0)}
// //                 </div>
// //                 <div>
// //                   <div
// //                     className={`font-bold text-lg ${
// //                       TEXT_COLORS[card.index % 3]
// //                     }`}
// //                   >
// //                     {testimonials[card.index].author}
// //                   </div>
// //                   <div
// //                     className={`text-sm ${
// //                       TEXT_COLORS[card.index % 3]
// //                     } opacity-80`}
// //                   >
// //                     {testimonials[card.index].role}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>
// //       </div>

// //       <button
// //         onClick={next}
// //         className="text-4xl font-bold text-gray-600 hover:text-gray-900 transition-colors z-20"
// //       >
// //         &gt;
// //       </button>

// //       {/* Dots Indicator */}
// //       <div className="absolute bottom-4 flex gap-2 z-20">
// //         {testimonials.map((_, i) => (
// //           <button
// //             key={i}
// //             onClick={() => setIndex(i)}
// //             className={`w-3 h-3 rounded-full transition-all ${
// //               i === index ? "bg-gray-800 scale-110" : "bg-gray-300"
// //             }`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";

// const testimonials = [
//   {
//     id: 1,
//     text: "At Addifico Consulting, we use human creativity and the latest technologies to help business leaders, investors, and entrepreneurs enhance their market positioning, discover the next.",
//     author: "Milton Zahino",
//     role: "Behavioral Science",
//     avatar: "https://via.placeholder.com/40", // Replace with actual avatar URL
//   },
//   {
//     id: 2,
//     text: "Their strategic insights transformed our go-to-market approach. Truly innovative thinkers who deliver results.",
//     author: "Sarah Lin",
//     role: "CEO, TechNova",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     text: "I’ve worked with many consultants — Addifico stands out for their blend of empathy, data, and execution excellence.",
//     author: "Raj Patel",
//     role: "Founder, GrowthLabs",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     id: 4,
//     text: "They don’t just advise — they partner. Their team became an extension of ours, driving real change.",
//     author: "Elena Torres",
//     role: "CFO, VentureEdge",
//     avatar: "https://via.placeholder.com/40",
//   },
//   {
//     id: 5,
//     text: "From ideation to implementation, Addifico delivered beyond expectations. A true game-changer for our brand.",
//     author: "Marcus Lee",
//     role: "CMO, BrandPulse",
//     avatar: "https://via.placeholder.com/40",
//   },
// ];

// export default function Testimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const next = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prev = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   const currentTestimonial = testimonials[currentIndex];

//   return (
//     <section className="py-16 px-4 bg-green-50">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
//           TESTIMONIALS
//         </h2>

//         {/* Carousel Container */}
//         <div className="relative flex items-center justify-center">
//           {/* Left Arrow */}
//           <button
//             onClick={prev}
//             className="absolute left-4 z-10 p-3 text-black hover:text-gray-700 transition"
//             aria-label="Previous testimonial"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           {/* Card Stack */}
//           <div className="relative w-full max-w-md">
//             {/* Background Cards (Red & Yellow) */}
//             <div className="absolute inset-0 flex justify-center items-center">
//               <div className="w-full h-full max-w-[300px] rounded-xl bg-red-500 transform -rotate-3 scale-95"></div>
//             </div>
//             <div className="absolute inset-0 flex justify-center items-center">
//               <div className="w-full h-full max-w-[320px] rounded-xl bg-yellow-500 transform rotate-3 scale-95"></div>
//             </div>

//             {/* Front Card */}
//             <div className="relative bg-white p-6 rounded-xl shadow-lg z-20">
//               {/* Counter Badge */}
//               <span className="inline-block px-3 py-1 bg-yellow-400 text-xs font-medium rounded-full mb-4">
//                 {currentIndex + 1} of {testimonials.length}
//               </span>

//               {/* Testimonial Text */}
//               <p className="text-gray-800 leading-relaxed mb-6">
//                 {currentTestimonial.text}
//               </p>

//               {/* Read More Button */}
//               <div className="flex items-center justify-between">
//                 <button className="px-4 py-2 bg-yellow-400 text-sm font-medium rounded-full hover:bg-yellow-500 transition">
//                   Read More
//                 </button>
//                 <div className="flex space-x-1 text-gray-400">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               {/* Divider */}
//               <hr className="my-6 border-gray-200" />

//               {/* Author */}
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={currentTestimonial.avatar}
//                   alt={currentTestimonial.author}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     {currentTestimonial.author}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {currentTestimonial.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={next}
//             className="absolute right-4 z-10 p-3 text-black hover:text-gray-700 transition"
//             aria-label="Next testimonial"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Bottom Border */}
//       <div className="mt-10 border-t-2 border-blue-500"></div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "At Addifico Consulting, we use human creativity and the latest technologies to help business leaders, investors, and entrepreneurs enhance their market positioning, discover the next.",
    author: "Milton Zahino",
    role: "Behavioral Science",
    avatar: "https://via.placeholder.com/40", // Replace with actual avatar URL
  },
  {
    id: 2,
    text: "Their strategic insights transformed our go-to-market approach. Truly innovative thinkers who deliver results.",
    author: "Sarah Lin",
    role: "CEO, TechNova",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    text: "I’ve worked with many consultants — Addifico stands out for their blend of empathy, data, and execution excellence.",
    author: "Raj Patel",
    role: "Founder, GrowthLabs",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    text: "They don’t just advise — they partner. Their team became an extension of ours, driving real change.",
    author: "Elena Torres",
    role: "CFO, VentureEdge",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 5,
    text: "From ideation to implementation, Addifico delivered beyond expectations. A true game-changer for our brand.",
    author: "Marcus Lee",
    role: "CMO, BrandPulse",
    avatar: "https://via.placeholder.com/40",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-heroBackground">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          TESTIMONIALS
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-4 z-10 p-3 text-black hover:text-gray-700 transition"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Card Stack */}
          <div className="relative w-full">
            <div
              className=" inset-0 flex justify-center items-center pointer-events-none"
              style={{ transform: "rotate(0deg) scale(0.95)" }}
            >
              <div className="w-[300px] h-[400px] bg-red-500 rounded-xl shadow-lg"></div>
            </div>

            <div
              className=" inset-0 flex justify-center items-center pointer-events-none"
              style={{ transform: " scale(0.95)" }}
            >
              <div className=" h-full w-[500px] bg-yellow-500 rounded-xl shadow-lg"></div>
            </div>

            <div className="relative bg-white p-6 rounded-xl shadow-xl z-20 w-[400px]">
              {/* Counter Badge */}
              <span className="inline-block px-3 py-1 bg-yellow-400 text-xs font-medium rounded-full mb-4">
                {currentIndex + 1} of {testimonials.length}
              </span>

              {/* Testimonial Text */}
              <p className="text-gray-800 leading-relaxed mb-6">
                {currentTestimonial.text}
              </p>

              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-yellow-400 text-sm font-medium rounded-full hover:bg-yellow-500 transition">
                  Read More
                </button>
                <div className="flex space-x-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              {/* <hr className="my-6 border-gray-200" /> */}

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={next}
            className="absolute right-4 z-10 p-3 text-black hover:text-gray-700 transition"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Border */}
      {/* <div className="mt-10 border-t-2 border-blue-500"></div> */}
    </section>
  );
}
