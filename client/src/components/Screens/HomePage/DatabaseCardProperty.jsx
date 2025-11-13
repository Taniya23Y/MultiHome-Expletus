import React from "react";

const DatabasePropertyCard = ({ property }) => {
  const imageUrl =
    property.images && property.images[0]
      ? property.images[0].url
      : "https://via.placeholder.com/400x250";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
        src={imageUrl}
        alt={property.images?.[0]?.caption || property.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{property.title}</h2>
        <p className="text-sm text-gray-600">{property.location.address}</p>
        <p className="text-blue-600 font-semibold mt-2">
          ₹{property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          {property.bedrooms} BHK • {property.bathrooms} Bath
        </p>
        <p className="text-xs text-green-600 mt-1">{property.status}</p>
      </div>
    </div>
  );
};

export default DatabasePropertyCard;
