import React from "react";

const AdminPropertyCard = ({ property, actions }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <h3 className="font-semibold text-lg">{property.title}</h3>

      <p className="text-sm text-gray-500">
        {property.location?.city} • {property.propertyType}
      </p>

      <p className="text-sm">₹{property.price?.toLocaleString()}</p>

      <div className="flex gap-2 mt-3">{actions}</div>
    </div>
  );
};

export default AdminPropertyCard;
