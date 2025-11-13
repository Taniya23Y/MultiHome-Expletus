import React, { useState } from "react";
import { FaMapMarkerAlt, FaHome, FaRupeeSign, FaHeart } from "react-icons/fa";

const allProperties = [
  {
    id: 1,
    name: "Luxury 2BHK Apartment",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60",
    location: "Vijay Nagar, Indore",
    type: "Buy",
    price: "45 Lakh",
  },
  {
    id: 2,
    name: "Modern Studio Flat",
    image:
      "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=900&q=60",
    location: "Palasia, Indore",
    type: "Rent",
    price: "₹18,000 / month",
  },
  {
    id: 3,
    name: "Spacious Villa with Garden",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60",
    location: "Rau, Indore",
    type: "Sale",
    price: "₹1.2 Cr",
  },
  {
    id: 4,
    name: "1BHK Budget Apartment",
    image:
      "https://images.unsplash.com/photo-1600585154154-297a5b6d8d2b?auto=format&fit=crop&w=900&q=60",
    location: "Bhawarkuan, Indore",
    type: "Rent",
    price: "₹12,000 / month",
  },
  {
    id: 5,
    name: "Premium Duplex Home",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=60",
    location: "Scheme 54 PU4, Indore",
    type: "Buy",
    price: "₹95 Lakh",
  },
  {
    id: 6,
    name: "Commercial Space for Sale",
    image:
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=900&q=60",
    location: "AB Road, Indore",
    type: "Sale",
    price: "₹3.5 Cr",
  },
];

const SuggestedProperties = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Buy", "Rent", "Sale"];

  const filteredProperties =
    selectedCategory === "All"
      ? allProperties
      : allProperties.filter((p) => p.type === selectedCategory);

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-[#F9FAFB] to-white"
      id="suggested-properties"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Suggested <span className="text-blue-600">Nearby Properties</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover premium homes and apartments near your location — filter
            easily by category to find your next perfect space.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-all"></div>

                {/* Type Badge */}
                <span
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm ${
                    property.type === "Buy"
                      ? "bg-green-500/80 text-white"
                      : property.type === "Rent"
                      ? "bg-yellow-500/80 text-white"
                      : "bg-blue-600/80 text-white"
                  }`}
                >
                  {property.type}
                </span>

                {/* Heart icon */}
                <button className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition">
                  <FaHeart className="text-lg" />
                </button>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FaHome className="text-blue-600" />
                  {property.name}
                </h3>

                <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  {property.location}
                </p>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-blue-700 flex items-center gap-1 text-lg">
                    <FaRupeeSign className="text-blue-600" />
                    {property.price}
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-full font-medium hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition">
            View More Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuggestedProperties;
