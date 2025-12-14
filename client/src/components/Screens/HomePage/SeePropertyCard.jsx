import React from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaParking,
  FaShieldAlt,
  FaBolt,
  FaCouch,
  FaWater,
  FaBuilding,
} from "react-icons/fa";

const SeePropertyCard = ({
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
      {/* Image */}
      <div className="w-full h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        <p className="text-gray-500 text-sm font-medium">
          {city}, {country} • {type}
        </p>

        <p className="text-gray-500 text-sm">
          {address} • {area} sq ft
        </p>

        {/* Pricing */}
        <div className="text-[#7FC68A] font-semibold text-lg">
          {price && <span>₹{price.toLocaleString()}</span>}
          {salePrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{salePrice.toLocaleString()}
            </span>
          )}
          {rentPrice && <span> / ₹{rentPrice} per month</span>}
        </div>

        {/* Rooms */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
          {bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <FaBed /> {bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FaBath /> {bathrooms}
          </span>
          {garages > 0 && (
            <span className="flex items-center gap-1">
              <FaCar /> {garages}
            </span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-3">
          {amenities.includes("parking") && (
            <Amenity icon={<FaParking />} label="Parking" />
          )}
          {amenities.includes("security") && (
            <Amenity icon={<FaShieldAlt />} label="Security" />
          )}
          {amenities.includes("power-backup") && (
            <Amenity icon={<FaBolt />} label="Power Backup" />
          )}
          {amenities.includes("furnished") && (
            <Amenity icon={<FaCouch />} label="Furnished" />
          )}
          {amenities.includes("water-supply") && (
            <Amenity icon={<FaWater />} label="24x7 Water" />
          )}
          {amenities.includes("lift") && (
            <Amenity icon={<FaBuilding />} label="Lift" />
          )}
        </div>
      </div>
    </div>
  );
};

const Amenity = ({ icon, label }) => (
  <span className="flex items-center gap-1 text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-full">
    {icon} {label}
  </span>
);

export default SeePropertyCard;
