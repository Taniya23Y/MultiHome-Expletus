import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllPublicPropertiesQuery } from "../../../redux/features/property/propertyApi";
import PropertyCardUI from "../../UI/PropertyCardUI";
import { useNavigate } from "react-router-dom";

const PropertyUI = () => {
  const { data, isLoading, isError } = useGetAllPublicPropertiesQuery();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const properties = data?.properties || [];

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error</p>;

  return (
    <div className="relative w-full">
      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                   bg-white/90 shadow-lg rounded-full p-2"
      >
        <ChevronLeft size={24} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                   bg-white/90 shadow-lg rounded-full p-2"
      >
        <ChevronRight size={24} />
      </button>

      {/* CARDS */}
      <div ref={scrollRef} className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 p-4 min-w-max">
          {properties.map((property) => (
            <PropertyCardUI
              key={property._id}
              property={property}
              onClick={() => navigate(`/property-detail-page/${property._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyUI;
