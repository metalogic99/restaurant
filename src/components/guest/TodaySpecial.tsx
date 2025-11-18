"use client";
import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialCard from "./SpecialCard";
import { useGetSpecials } from "@/hooks/special.hooks";
import AdminError from "../admin/AdminError";
import Loading from "../shared/Loading";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TodaySpecial = () => {
  const { data, isLoading, error } = useGetSpecials();
  const todaysSpecials = useMemo(() => {
    return data && data.specials ? data.specials : [];
  }, [data]);

  // Custom arrow components
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <ChevronRight className="text-forestGreen text-xl" />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <ChevronLeft className="text-forestGreen text-xl" />
      </div>
    );
  };

  // Slider configuration
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div className="custom-dots-container">
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="custom-dot"></div>,
  };

  if (isLoading) {
    return (
      <div className="flex h-30 w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <AdminError error={error.message} />;
  }
  if (!todaysSpecials || todaysSpecials.length === 0) return <></>;

  return (
    <div className="mb-12 px-4">
      <div className="text-3xl md:text-4xl font-bold text-forestGreen mb-6 text-center">
        Today&apos;s Special
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Slider {...settings} className="special-slider">
          {todaysSpecials.map((special, index) => (
            <div key={index} className="px-2 pb-4">
              <SpecialCard special={special} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TodaySpecial;
