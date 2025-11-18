import Image from "next/image";

const SpecialCard = ({ special }: { special: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
      {/* Image Section */}
      <div className="relative h-60 md:h-72 w-full">
        <Image
          src={special.image}
          alt={special.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-800">
          {special.name}
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{special.description}</p>
        <div className="text-xl font-bold text-emerald-500">
          {special.price}
        </div>
      </div>
    </div>
  );
};

export default SpecialCard;
