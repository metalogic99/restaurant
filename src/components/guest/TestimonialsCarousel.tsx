"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    text: "At Addifico Consulting, we use human creativity and the latest technologies to help business leaders, investors, and entrepreneurs enhance their market positioning, discover the next.",
    author: "Milton Zahino",
    role: "Behavioral Science Expert",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    text: "Their strategic insights transformed our go-to-market approach. Truly innovative thinkers who deliver results.",
    author: "Sarah Lin",
    role: "CEO, TechNova",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    text: "I've worked with many consultants — Addifico stands out for their blend of empathy, data, and execution excellence.",
    author: "Raj Patel",
    role: "Founder, GrowthLabs",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    text: "They don't just advise — they partner. Their team became an extension of ours, driving real change.",
    author: "Elena Torres",
    role: "CFO, VentureEdge",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    text: "From ideation to implementation, Addifico delivered beyond expectations. A true game-changer for our brand.",
    author: "Marcus Lee",
    role: "CMO, BrandPulse",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const returnColor = (index: number) => {
    const remainder = index % 2;
    switch (remainder) {
      case 0:
        return "bg-yellow-500";
      case 1:
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-heroBackground">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 tracking-wide">
        TESTIMONIALS
      </h2>
      {/* <div className="w-24 h-1 bg-orange rounded-full mb-10"></div> */}

      <div className="flex items-center justify-center w-full max-w-4xl mt-8">
        <button
          onClick={goToPrevious}
          className="text-gray-700 text-3xl font-bold px-4 py-2 transition-all duration-300 transform hover:scale-110 focus:outline-none"
          aria-label="Previous testimonial"
        >
          &lt;
        </button>

        <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl shadow-xl">
          <div
            className={`relative flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500 ease-in-out transform h-[430px] ${
              isTransitioning ? "opacity-90 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`text-gray-800 ${returnColor(
                    currentIndex
                  )} text-xs font-bold rounded-full px-3 py-1.5`}
                >
                  {currentIndex + 1} of {testimonials.length}
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonials.length)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsTransitioning(true);
                        setCurrentIndex(i);
                      }}
                      className={`w-2 h-2 rounded-full ${
                        i === currentIndex
                          ? returnColor(currentIndex)
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <p
                className={`text-gray-700 mb-6 leading-relaxed text-lg italic border-l-4 ${
                  currentIndex % 2 === 0
                    ? "border-yellow-500"
                    : "border-red-500"
                }  pl-4 py-1`}
              >
                {testimonials[currentIndex].text}
              </p>
            </div>

            <div className="flex items-center justify-between">
              {/* <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-800 font-medium rounded-full px-5 py-2.5 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50">
                Read More
              </button> */}

              <div className="flex items-center">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className={`w-14 h-14 rounded-full object-cover border-2 ${
                    currentIndex % 2 === 0
                      ? "border-yellow-500"
                      : "border-red-500"
                  }  shadow-sm`}
                  height={14}
                  width={14}
                />
                <div className="ml-3">
                  <div className="font-bold text-gray-800">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="text-gray-700 text-3xl font-bold px-4 py-2 transition-all duration-300 transform hover:scale-110 focus:outline-none"
          aria-label="Next testimonial"
        >
          &gt;
        </button>
      </div>

      {/* Navigation dots for mobile */}
      <div className="flex mt-8 space-x-2 md:hidden">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(i);
            }}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-yellow-400" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
