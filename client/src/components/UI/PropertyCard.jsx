import React from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaWifi,
  FaParking,
  FaTree,
  FaUmbrellaBeach,
} from "react-icons/fa";

const PropertyCard = ({
  image,
  name,
  description,
  city,
  country,
  type,
  address,
  area,
  price,
  salePrice,
  rentPrice,
  bedrooms,
  bathrooms,
  garages,
  amenities = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Property Image */}
      <div className="w-full h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Property Info */}
      <div className="p-5 flex flex-col gap-3">
        {/* Name & Description */}
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>

        {/* City | Country | Type */}
        <p className="text-gray-500 text-sm font-medium">
          {city} | {country} | {type}
        </p>

        {/* Address | Area */}
        <p className="text-gray-500 text-sm">
          {address} | {area} sq ft
        </p>

        {/* Price Info */}
        <p className="text-[#7FC68A] font-semibold text-lg">
          Price: {price} | Sale: {salePrice} | Rent: {rentPrice}
        </p>

        {/* Bedrooms | Bathrooms | Garages */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
          <span className="flex items-center gap-1">
            <FaBed /> {bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <FaBath /> {bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <FaCar /> {garages} Garages
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mt-3">
          {amenities.includes("parking") && (
            <span className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              <FaParking /> Parking
            </span>
          )}
          {amenities.includes("wifi") && (
            <span className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              <FaWifi /> WiFi
            </span>
          )}
          {amenities.includes("backyard") && (
            <span className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              <FaTree /> Backyard
            </span>
          )}
          {amenities.includes("terrace") && (
            <span className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              <FaUmbrellaBeach /> Terrace
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
