import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const { id, image, name, city, country, type, price, description } = property;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm hover:scale-105 transition-transform duration-300">
      {/* Property Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        <p className="text-gray-500 text-sm">
          {city}, {country} — <span className="font-medium">{type}</span>
        </p>
        <p className="text-[#7FC68A] font-semibold">{price}</p>

        {/* Action Buttons */}
        <div className="flex justify-between mt-3">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="flex items-center gap-2 text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              <FaEdit /> Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition"
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
