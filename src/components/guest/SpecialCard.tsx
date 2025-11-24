import Image from "next/image";

const SpecialCard = ({ special }: { special: any }) => {
  return (
    <div className=" rounded-xl overflow-hidden transition-all duration-300 group bg-white">
      <div className="relative h-96 md:h-[450px] ">
        {" "}
        <Image
          src={special.image}
          alt={special.name}
          fill
          className="object-cover"
          sizes="(max-width: 820px) 100vw, (max-width: 1250px) 50vw, 33vw"
        />{" "}
        <div className=" w-24 h-20 z-30 absolute flex items-center justify-center right-8 bg-[url('/guest/menu/price.png')] bg-no-repeat bg-cover ">
          {" "}
          <span className="text-white text-xl font-semibold flex">
            {" "}
            Rs. {special.price}{" "}
          </span>{" "}
        </div>{" "}
      </div>

      <div className="p-5 flex items-center justify-center gap-3">
        <h3 className="text-xl md:text-2xl font-bold  text-forestGreen">
          Today&apos;s Special
        </h3>
        <p className="text-black text-xl md:text-2xls font-semibold line-clamp-2 ">
          {special.description}
        </p>
      </div>
    </div>
  );
};

export default SpecialCard;
