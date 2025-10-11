import React from "react";
import { assets } from "../../../assets/data";
import PropertyCard from "../../UI/PropertyCard";

const dummyProperties = [
  {
    image: assets.bgImage,
    name: "Modern Family Home",
    description: "Luxurious and cozy home with modern amenities.",
    city: "Indore",
    country: "India",
    type: "Villa",
    address: "123 Main Street",
    area: 2800,
    price: "$350,000",
    salePrice: "$340,000",
    rentPrice: "$1,500/mo",
    bedrooms: 4,
    bathrooms: 3,
    garages: 2,
    amenities: ["parking", "wifi", "backyard", "terrace"],
  },
  {
    image: assets.heroHomeImage,
    name: "Luxury Apartment",
    description: "Elegant apartment in city center with premium facilities.",
    city: "Bhopal",
    country: "India",
    type: "Apartment",
    address: "45 Central Avenue",
    area: 1800,
    price: "$220,000",
    salePrice: "$210,000",
    rentPrice: "$900/mo",
    bedrooms: 3,
    bathrooms: 2,
    garages: 1,
    amenities: ["wifi", "terrace"],
  },
  {
    image: assets.HeroBackImage,
    name: "Cozy Cottage",
    description: "Perfect countryside retreat with backyard and terrace.",
    city: "Mumbai",
    country: "India",
    type: "Cottage",
    address: "22 Hill Street",
    area: 1500,
    price: "$180,000",
    salePrice: "$170,000",
    rentPrice: "$800/mo",
    bedrooms: 2,
    bathrooms: 2,
    garages: 1,
    amenities: ["parking", "backyard"],
  },
];

const AvailableProperties = () => {
  return (
    <section className="max-container mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Properties Available
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProperties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </section>
  );
};

export default AvailableProperties;
