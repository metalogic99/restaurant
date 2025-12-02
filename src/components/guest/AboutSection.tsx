import React from "react";
import CommonSectionGuest from "./CommonSectionGuest";
import Image from "next/image";

const AboutSection = () => {
  return (
    <CommonSectionGuest>
      {" "}
      <div className="flex w-full relative justify-between xl:pl-16 md:pl-8  gap-24 overflow-hidden">
        <Image
          src="/guest/wave.png"
          alt="wave"
          width={1000}
          height={1000}
          className="object-cover hidden md:block absolute w-full -bottom-20 left-0 -z-10"
        />
        <div className="flex flex-col-reverse md:flex-row justify-between xl:gap-10">
          <div className=" w-full">
            <h2 className="text-3xl font-bold mb-4 md:mt-20">ABOUT US</h2>
            <p className="text-gray-600 leading-loose tracking-wider  text-justify ">
              Welcome to Mint Restaurant, the premier destination for inventive
              vegetarian cuisine located in the historic heart of Babarmahal,
              Kathmandu. We are dedicated to the simple philosophy that
              wholesome, plant-based dining should be extraordinary. Our
              commitment extends beyond the plate to our environment, which
              features a stunning, contemporary interior space meticulously
              designed as a calm, stylish oasis for our guests, ensuring every
              visit is an experience of elegance and culinary delight.
            </p>
          </div>
          <div className="flex justify-center mt-10 md:mt-0">
            <Image
              src="/guest/qr.png"
              alt="QR Code"
              width={600}
              height={600}
              className="w-60 sm:w-72 md:w-[600px] lg:w-[600px] h-auto"
            />
          </div>
        </div>
      </div>
    </CommonSectionGuest>
  );
};

export default AboutSection;

// import React from "react";
// import CommonSectionGuest from "./CommonSectionGuest";
// import Image from "next/image";

// const AboutSection = () => {
//   return (
//     <CommonSectionGuest>
//       <div className="relative w-full px-4 md:px-10 lg:px-0 overflow-hidden">
//         {/* Background Wave */}
//         <Image
//           src="/guest/wave.png"
//           alt="wave"
//           width={1000}
//           height={1000}
//           className="object-cover hidden md:flex absolute w-full bottom-0 left-0 -z-10 opacity-80"
//         />

//         <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
//           {/* LEFT TEXT */}
//           <div className="w-full">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">
//               ABOUT US
//             </h2>

//             <p className="text-gray-600 leading-relaxed tracking-wide text-justify text-sm sm:text-base">
//               Welcome to Mint Restaurant, the premier destination for inventive
//               vegetarian cuisine located in the historic heart of Babarmahal,
//               Kathmandu. We are dedicated to the simple philosophy that
//               wholesome, plant-based dining should be extraordinary. Our
//               commitment extends beyond the plate to our environment, which
//               features a stunning, contemporary interior space meticulously
//               designed as a calm, stylish oasis for our guests, ensuring every
//               visit is an experience of elegance and culinary delight.
//             </p>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="flex justify-center w-full md:w-[50%]">
//             <Image
//               src="/guest/qr-hand.png"
//               alt="QR Code"
//               width={600}
//               height={600}
//               className="w-60 sm:w-72 md:w-96 lg:w-[450px] h-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </CommonSectionGuest>
//   );
// };

// export default AboutSection;
