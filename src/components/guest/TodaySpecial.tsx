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

  const onlyOne = todaysSpecials.length === 1;

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} arrow-right`}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="h-10 w-10 bg-orange rounded-full flex items-center justify-center">
          <ChevronRight className="text-white text-xl" />
        </div>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} z-20 translate-x-6 arrow-left`}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="h-10 w-10 bg-orange rounded-full flex items-center justify-center">
          <ChevronLeft className="text-white text-xl" />
        </div>
      </div>
    );
  };

  // Slider configuration
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 1200,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   appendDots: (dots: any) => (
  //     <div className="custom-dots-container">
  //       <ul className="custom-dots">{dots}</ul>
  //     </div>
  //   ),
  //   customPaging: () => <div className="custom-dot"></div>,
  // };
  const settings = {
    dots: !onlyOne,
    infinite: !onlyOne,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !onlyOne,
    autoplaySpeed: 3000,
    speed: 2000,
    nextArrow: !onlyOne ? <NextArrow /> : <></>,
    prevArrow: !onlyOne ? <PrevArrow /> : <></>,
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
    <div className="my-12 px-4">
      {/* <div className="text-3xl md:text-4xl font-bold text-forestGreen mb-6 text-center">
        Today&apos;s Special
      </div> */}

      <div className="bg-white relative max-w-3xl mx-auto rounded-lg shadow-[0_4px_14.4px_rgba(0,0,0,0.25)]">
        <Slider {...settings} className="special-slider">
          {todaysSpecials.map((special, index) => (
            <div key={index} className="px-10 pt-8 bg-white rounded-lg">
              <SpecialCard special={special} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TodaySpecial;
