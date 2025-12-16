import { useState } from "react";
import { BedDouble, Bath, Car, Sofa, Heart, Star } from "lucide-react";
import { assets } from "../../assets/data";

const PropertyCardUI = ({ property, onClick }) => {
  const [wishlisted, setWishlisted] = useState(false);

  if (!property) return null;

  const {
    title,
    description,
    images,
    discountPrice,
    price,
    areaSqFt,
    location,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    averageRating = 0,
    reviews = [],
  } = property;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <div
      onClick={onClick}
      className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-md
                 hover:shadow-xl hover:-translate-y-1 transition-all
                 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={images?.[0] || assets.bgImage}
          alt={title}
          className="h-full w-full object-cover"
        />

        {/* WISHLIST */}
        <button
          onClick={toggleWishlist}
          className="absolute cursor-pointer top-3 right-3 z-20
                     bg-white/90 backdrop-blur
                     rounded-full p-2 shadow-md
                     hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* TITLE + RATING */}
        <div className="flex items-start justify-between gap-2">
          {/* TITLE */}
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 flex-1">
            {title}
          </h3>

          {/* RATING (ALWAYS VISIBLE) */}
          <div className="flex items-center gap-1 text-xs text-gray-600 flex-shrink-0 min-w-[72px] justify-end">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-400">({reviews.length})</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-1">{description}</p>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          {discountPrice && (
            <span className="text-lg font-bold text-green-600">
              ₹{discountPrice.toLocaleString()}
            </span>
          )}
          {price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{price.toLocaleString()}
            </span>
          )}
        </div>

        {/* LOCATION */}
        <p className="text-sm text-gray-600">
          {areaSqFt} sq.ft • {location?.locality || "Indore"}
        </p>

        {/* AMENITIES */}
        <div className="flex items-center justify-between pt-2 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <BedDouble size={16} /> {bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} /> {bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Car size={16} /> {parking}
          </span>
          <span className="flex items-center gap-1">
            <Sofa size={16} /> {furnished}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardUI;
