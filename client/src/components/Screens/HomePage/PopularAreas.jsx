import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const popularAreas = [
  {
    name: "Vijay Nagar",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=60",
    properties: 120,
  },
  {
    name: "Palasia",
    image:
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=900&q=60",
    properties: 98,
  },
  {
    name: "Bhawarkuan",
    image:
      "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=900&q=60",
    properties: 86,
  },
  {
    name: "Rau",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=60",
    properties: 75,
  },
  {
    name: "Scheme 54 PU4",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60",
    properties: 65,
  },
  {
    name: "Rajendra Nagar",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=60",
    properties: 80,
  },
  {
    name: "Kanadia Road",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02e7?auto=format&fit=crop&w=900&q=60",
    properties: 72,
  },
  {
    name: "Khajrana",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60",
    properties: 89,
  },
  {
    name: "Bengali Square",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60",
    properties: 67,
  },
  {
    name: "AB Road",
    image:
      "https://images.unsplash.com/photo-1613545325278-f24b52f9fbe9?auto=format&fit=crop&w=900&q=60",
    properties: 110,
  },
  {
    name: "Tilak Nagar",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=60",
    properties: 58,
  },
  {
    name: "Saket Nagar",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60",
    properties: 42,
  },
];

const PopularAreas = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F9FAFB]" id="popular-areas">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Explore Homes in{" "}
            <span className="text-blue-600">Popular Areas of Indore</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Find your dream home in Indore’s most loved neighborhoods.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {popularAreas.map((area, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-36 sm:h-44 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white">
                <h3 className="text-sm sm:text-base font-semibold flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-400 text-xs sm:text-sm" />
                  {area.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  {area.properties} Properties
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-blue-700 hover:shadow-md transition">
            View All Areas
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;
