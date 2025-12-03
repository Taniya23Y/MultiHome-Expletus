import React, { useState } from "react";
import { FaBath, FaBed, FaCar, FaRulerCombined, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const dummySeller = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+91 9876543210",
  description: "Professional real estate seller with 10+ years of experience.",
};

const dummyReviews = [
  { rating: 5, comment: "Amazing property!" },
  { rating: 4, comment: "Very good location and amenities." },
  { rating: 5, comment: "Seller was very helpful and responsive." },
];

const PropertyImages = ({ properties }) => {
  const [index, setIndex] = useState(0);
  const { id } = useParams();

  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <h2 className="text-center text-2xl mt-10">Property Not Found</h2>;
  }

  // const { name, description, city, area, type, price, images } = property;
  const { images } = property;

  const title = property.name || "Sample Property Title";
  const descriptions = property.description;
  const detaildescriptionsOne =
    "Welcome to Maple Residency, a charming and thoughtfully designed 2 BHK villa that perfectly combines modern comfort with serene living. Nestled in a peaceful neighborhood, this villa is ideal for families, professionals, and anyone looking for a cozy yet stylish home with easy access to urban amenities.";
  const detaildescriptionsTwo =
    "Whether you are starting a new chapter in life or seeking a serene retreat, Maple Residency offers an unparalleled living experience that blends convenience, functionality, and a touch of luxury. From the moment you step into Maple Residency, you will notice the attention to detail in its design and layout. The villa spans a generous area, providing ample space for a comfortable lifestyle.";
  const prices = property.price || 7500000;
  const bedrooms = property.bedrooms || 3;
  const bathrooms = property.bathrooms || 2;
  const parking = property.parking || "Car";
  const areaSqFt = property.areaSqFt || 1800;
  const reviews = property.reviews?.length ? property.reviews : dummyReviews;
  const averageRating =
    property.averageRating ||
    Math.round(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length);

  return (
    <div className="container mx-auto w-full min-h-screen px-4 pb-20">
      <div className="max-w-7xl mx-auto flex gap-4 w-full h-[390px]">
        {/* MAIN IMAGE FIXED 70% WIDTH ALWAYS */}
        <div
          className="rounded-xl overflow-hidden transition-all duration-500 relative"
          style={{
            width: "70%",
            height: "100%",
          }}
        >
          <img
            key={index}
            src={images[index].url}
            alt={images[index].title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />

          {/* TEXT */}
          <div
            key={images[index].title}
            className="absolute bottom-0 left-0 text-white p-4 rounded-tr-xl transition-all duration-500 ease-out"
          >
            <h4 className="font-semibold text-[2rem]">{images[index].title}</h4>
            <p className="text-md opacity-90">{images[index].desc}</p>
          </div>
        </div>

        {/* THUMBNAILS FIXED 30% ALWAYS */}
        <div
          className="flex flex-col gap-3 overflow-y-auto rounded-xl hide-scrollbar"
          style={{
            width: "30%",
            height: "100%",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              onMouseEnter={() => setIndex(i)}
              className={`
                h-[120px] w-full overflow-hidden rounded-lg cursor-pointer 
                transition-all duration-300 ease-out
                ${
                  i === index
                    ? "ring-2 ring-black scale-[1.03] shadow-lg shadow-black/20"
                    : "opacity-80 hover:opacity-100 hover:scale-[1.02]"
                }
              `}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* DETAILS + SELLER SECTION */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col lg:flex-row gap-6">
        {/* LEFT: Property Details */}
        <div className="lg:w-2/3 space-y-6">
          {/* TITLE + DESCRIPTION */}
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="mt-4 text-gray-700 leading-relaxed">{descriptions}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {detaildescriptionsOne}
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {detaildescriptionsTwo}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="border border-black p-6 rounded-xl flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FaBed className="text-xl text-gray-600" /> {bedrooms} Beds
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaBath className="text-xl text-gray-600" /> {bathrooms} Baths
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaCar className="text-xl text-gray-600" /> {parking}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaRulerCombined className="text-xl text-gray-600" /> {areaSqFt}{" "}
              SqFt
            </div>
          </div>

          {/* PRICE */}
          <div className="bg-white p-6 rounded-xl shadow-md text-2xl font-bold text-green-600">
            ₹ {prices.toLocaleString()}
          </div>
        </div>

        {/* RIGHT: Seller Info + Reviews */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Seller Information
            </h2>
            <p className="text-gray-700">{dummySeller.description}</p>

            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <strong>Name:</strong> {dummySeller.name}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <strong>Email:</strong> {dummySeller.email}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <strong>Phone:</strong> {dummySeller.phone}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Message / Chat
              </button>
              <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Call Seller
              </button>
              <button className="bg-gray-200 text-gray-900 py-2 rounded-md hover:bg-gray-300 transition">
                View Profile
              </button>
            </div>

            {/* RATINGS */}
            <div className="flex items-center gap-2 mt-2">
              <FaStar className="text-yellow-500 text-xl" />
              <span className="font-semibold">{averageRating}/5</span>
              <span className="text-gray-500">({reviews.length} Reviews)</span>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((r, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">{r.rating}</span>
                  </div>
                  <p className="text-gray-700">{r.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
