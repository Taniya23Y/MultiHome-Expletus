import { useParams } from "react-router-dom";
import { BedDouble, Bath, Car, Ruler, Star } from "lucide-react";
import { useState } from "react";
import { useGetPropertyByIdQuery } from "../../../redux/features/property/propertyApi";
import PropertyImage from "./PropertyImage";
import SellerCard from "../../UI/SellerCard";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPropertyByIdQuery(id);

  const [tab, setTab] = useState("overview");

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !data?.property)
    return <p className="text-center py-10 text-red-500">Property not found</p>;

  const property = data.property;

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* IMAGE GALLERY */}
      <div className="pt-20">
        <PropertyImage images={property.images} />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <span className="font-semibold">
                {property.averageRating?.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({property.reviews.length} reviews)
              </span>
            </div>
          </div>

          {/* FEATURES ROW */}
          <div className="flex flex-wrap gap-6 text-gray-700 border-b pb-6">
            <Feature
              icon={<BedDouble size={18} />}
              value={`${property.bedrooms} Bedroom`}
            />
            <Feature
              icon={<Bath size={18} />}
              value={`${property.bathrooms} Bathroom`}
            />
            <Feature
              icon={<Ruler size={18} />}
              value={`${property.areaSqFt} sq.ft`}
            />
            <Feature
              icon={<Car size={18} />}
              value={`${property.parking} Garage`}
            />
          </div>

          {/* TABS */}
          <div>
            <div className="flex gap-6 border-b">
              {["overview", "expense", "location"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`pb-3 capitalize font-medium ${
                    tab === item
                      ? "border-b-2 border-black text-black"
                      : "text-gray-400"
                  }`}
                >
                  {item.replace("-", " ")}
                </button>
              ))}
            </div>

            <div className="pt-6 text-gray-700 leading-relaxed">
              {tab === "overview" && <p>{property.description}</p>}
              {tab === "expense" && (
                <p>Estimated monthly expense details will be shown here.</p>
              )}
              {tab === "location" && (
                <p>
                  📍 {property.location.address}, {property.location.city}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PRICE CARD */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="border rounded-2xl p-6 shadow-sm space-y-4">
            <p className="text-sm text-gray-500">Buy with the price</p>

            <h2 className="text-3xl font-bold text-green-600">
              ₹ {property.discountPrice?.toLocaleString()}
            </h2>

            <p className="text-sm text-gray-500">
              Market price based on location
            </p>

            <p className="font-semibold">
              ₹ {property.price?.toLocaleString()}{" "}
              <span className="text-green-600 text-sm ml-1">5% cheaper</span>
            </p>
          </div>

          <SellerCard sellerId={property.sellerId} />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-medium">{value}</span>
  </div>
);

export default PropertyDetailPage;
