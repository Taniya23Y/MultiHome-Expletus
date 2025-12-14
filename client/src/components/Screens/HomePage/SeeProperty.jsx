import React from "react";
import { assets } from "../../../assets/data";
import SeePropertyCard from "./SeePropertyCard";
import { useGetAllPublicPropertiesQuery } from "../../../redux/features/property/propertyApi";
// import axios from "axios"; // if you are using axios

const SeeProperty = () => {
  const { data, isLoading, isError } = useGetAllPublicPropertiesQuery();

  const properties = data?.properties || [];

  if (isLoading) {
    return <p className="text-center mt-10">Loading properties...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load properties
      </p>
    );
  }

  return (
    <section className="max-container mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Properties Available
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <SeePropertyCard
            key={property._id}
            /* Image handling */
            image={
              property.images?.length > 0 ? property.images[0] : assets.bgImage
            }
            /* Basic info */
            name={property.title}
            description={property.description}
            type={property.propertyType}
            address={property.societyName}
            city={property.location?.city || "Indore"}
            country="India"
            /* Area & pricing */
            area={property.areaSqFt}
            price={property.price}
            salePrice={property.discountPrice}
            /* Rooms */
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            garages={
              property.parking === "Both" || property.parking === "Car" ? 1 : 0
            }
            /* Amenities */
            amenities={[
              property.liftAvailable && "lift",
              property.securityAvailable && "security",
              property.electricityBackup && "power-backup",
              property.waterSupply === "24x7" && "water-supply",
              property.furnished === "Fully-Furnished" && "furnished",
            ].filter(Boolean)}
          />
        ))}
      </div>
    </section>
  );
};

export default SeeProperty;
