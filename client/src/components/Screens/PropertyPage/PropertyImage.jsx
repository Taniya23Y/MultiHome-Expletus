import { useState } from "react";

const PropertyImage = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="h-[350px] bg-gray-200 rounded-xl flex items-center justify-center">
        No Images Available
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[450px]">
      {/* MAIN IMAGE */}
      <div className="lg:col-span-3 rounded-2xl overflow-hidden">
        <img
          src={images[index]}
          alt=""
          className="w-full h-[300px] lg:h-full object-cover"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setIndex(i)}
            className={`h-24 w-32 lg:w-full lg:h-24 object-cover rounded-xl cursor-pointer
              ${i === index ? "ring-2 ring-black" : "opacity-70"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImage;
