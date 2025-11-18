import LoadingSmall from "@/components/shared/LoadingSmall";
import React from "react";

const ButtonActions = ({
  bg,
  bg_hover,
  text,
  onClick,
  isLoading,
  localDataResult,
  orderId,
}: {
  bg: string;
  bg_hover: string;
  text: string;
  onClick: () => void;
  isLoading: boolean;
  localDataResult?: any;
  orderId?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={` text-white ${
        text !== "Order" || localDataResult ? bg : "pointer-events-none"
      } ${
        text !== "Finish Payment" || orderId
          ? bg
          : `pointer-events-none ${bg}/50`
      } flex items-center justify-center py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl ${bg_hover} transition-colors text-xs sm:text-sm font-medium`}
    >
      {isLoading ? <LoadingSmall /> : <span>{text}</span>}
    </button>
  );
};

export default ButtonActions;
