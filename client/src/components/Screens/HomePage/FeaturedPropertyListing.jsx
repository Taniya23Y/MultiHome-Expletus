import React, { useRef, useState, useEffect } from "react";

const AreaProperty = ({ properties }) => {
  const sampleProperties = [
    {
      id: 1,
      name: "Greenwood Villa",
      description:
        "Modern 3 BHK apartment with balcony and lush garden surroundings.",
      city: "Indore",
      area: "1800 sqft",
      type: "3 BHK Apartment",
      price: "₹ 45,00,000",
      link: "https://example.com/property/1",
      images: [
        "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        "https://plus.unsplash.com/premium_photo-1661874810454-4405e764b706?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
        "https://media.istockphoto.com/id/2224342823/photo/view-of-the-orangery-with-a-round-roof-in-the-royal-botanic-garden-of-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=NsPzG0IqMPIGoLG1T6Xgc-IO98SKHqE4ygwvgbJp7VU=",
      ],
    },
    {
      id: 2,
      name: "Maple Residency",
      description: "Cozy 2 BHK near schools, markets, and green parks.",
      city: "Indore",
      area: "1200 sqft",
      type: "2 BHK Apartment",
      price: "₹ 28,00,000",
      link: "https://example.com/property/2",
      images: [
        "https://media.istockphoto.com/id/656057742/photo/3d-rendering-black-loft-modern-house.jpg?s=612x612&w=0&k=20&c=P_ekX2f0a40uVUWaOJp3ds_zPp1AxGzgR5sbT4uKu5U=",
        "https://media.istockphoto.com/id/1456467041/photo/beautiful-kitchen-in-new-farmhouse-style-luxury-home-with-island-pendant-lights-and-hardwood.webp?a=1&b=1&s=612x612&w=0&k=20&c=QHbU4O3aJU-L6FiFx1eyb_Fa-sTUKfcMHx0o0ao1uVE=",
        "https://plus.unsplash.com/premium_photo-1746471641369-5ee2e0ccfff5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
        "https://media.istockphoto.com/id/2160382184/photo/efficient-car-park-interior-design-ideas-for-a-functional-and-organized-parking-lot.webp?a=1&b=1&s=612x612&w=0&k=20&c=8kt_lLPBp2cRn4yX-JFdpNsIJYKBzH9MwYK9VmfdRZM=",
      ],
    },
    {
      id: 3,
      name: "Palm Meadows",
      description: "Spacious 4 BHK villa with pool and private garden.",
      city: "Indore",
      area: "3500 sqft",
      type: "3 BHK Apartment",
      price: "₹ 1.2 Cr",
      link: "https://example.com/property/3",
      images: [
        "https://media.istockphoto.com/id/656057834/photo/3d-rendering-black-minimal-wood-and-black-house.jpg?s=612x612&w=0&k=20&c=bhl5XSuxNzfkPSFTM6M2K4iRL63sFs7BeerGmwDcNNM=",
        "https://plus.unsplash.com/premium_photo-1680382578871-32ce66f9ae25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=800",
        "https://plus.unsplash.com/premium_photo-1733353309577-ebe815f18392?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
        "https://media.istockphoto.com/id/1729780209/photo/underground-pipelines.jpg?s=612x612&w=0&k=20&c=G4e8t0VVvaLODCzDZGdfdVi1hgqSWjVfUZfFfv0u2sM=",
      ],
    },
    {
      id: 4,
      name: "Luxury Villa",
      description:
        "Elegant villa with pool, wooden interiors, and skyline view.",
      city: "Indore",
      area: "5000 sqft",
      type: "4 BHK Apartment",
      price: "₹ 2.3 Cr",
      link: "https://example.com/property/4",
      images: [
        "https://plus.unsplash.com/premium_photo-1747846129339-4ccad287c92a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://plus.unsplash.com/premium_photo-1661963667668-f53a412a5922?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
        "https://plus.unsplash.com/premium_photo-1661963211494-558f6f7aa721?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
      ],
    },
    {
      id: 5,
      name: "Urban Loft",
      description:
        "Stylish loft apartment in Mumbai with open design and city views.",
      city: "Indore",
      area: "1500 sqft",
      type: "3 BHK Apartment",
      price: "₹ 85,00,000",
      link: "https://example.com/property/5",
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://plus.unsplash.com/premium_photo-1683141179507-734e6157ddba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
        "https://plus.unsplash.com/premium_photo-1661963058256-5358560f4c6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVkcm9vbSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      ],
    },
    {
      id: 6,
      name: "Beachside Bungalow",
      description: "Relaxing beachfront home with sea views and wooden deck.",
      city: "Indore",
      area: "2200 sqft",
      type: "2 BHK Apartment",
      price: "₹ 1.5 Cr",
      link: "https://example.com/property/6",
      images: [
        "https://media.istockphoto.com/id/2223117892/photo/modern-two-story-villa-with-black-slate-stone-facade-and-spacious-yard-in-autumn.jpg?s=612x612&w=0&k=20&c=Zz1Qxh0AicFVTU3-aB4D8vJ0dTGo89ICZSc5kQ50jWM=",
        "https://plus.unsplash.com/premium_photo-1661876219991-f9482980946a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ];

  const list = properties?.length ? properties : sampleProperties;
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const cardWidth = scrollWidth / list.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section className="w-full px-4 py-14 bg-gradient-to-b from-[#0F2F26] to-[#1B4438]">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Featured Properties
        </h2>
        <p className="text-emerald-200 mt-3 text-lg">
          Explore our premium listings with modern design and green living.
        </p>
      </div>

      {/* Arrows */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <button
          onClick={() => scroll("left")}
          className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-3 hover:scale-110 hover:bg-white transition"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-3 hover:scale-110 hover:bg-white transition"
        >
          →
        </button>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-4 w-full"
      >
        {list.map((property, index) => {
          const isActive = index === activeIndex;
          const isNext = index === activeIndex + 1;
          return (
            <div
              key={property.id}
              className={`snap-center flex-shrink-0 w-[90%] md:w-[65%] lg:w-[70%] mx-3 transition-all duration-700 ${
                isActive
                  ? "opacity-100 scale-100"
                  : isNext
                  ? "opacity-70 scale-95"
                  : "opacity-50 scale-90"
              }`}
            >
              <PropertyCard property={property} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AreaProperty;

const PropertyCard = ({ property }) => {
  const { images, name, description, city, area, type, price, link } = property;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-[#FFFDFF] w-full rounded-xl p-5 md:px-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 duration-500">
      {/* Left Side */}
      <div className="flex-1 space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {name}
        </h3>
        <p className="text-gray-700 text-sm md:text-base">{description}</p>
        <div className="text-gray-600 text-sm md:text-base">
          <span className="font-semibold text-emerald-800">{city}</span>
          <span className="mx-2">|</span>
          <span>{area}</span>
        </div>
        <p className="text-emerald-700 font-medium text-sm md:text-base">
          {type}
        </p>
        <div className="text-xl md:text-2xl font-semibold text-gray-900 mt-1">
          {price}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-gradient-to-tr from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-medium shadow hover:shadow-lg hover:scale-105 transition-all"
        >
          View Details
        </a>
      </div>

      {/* Right Side */}
      <div className="relative flex-2 w-full md:w-1/2">
        <img
          src={images[index]}
          alt={name}
          className="rounded-2xl w-full h-56 sm:h-72 md:h-80 lg:h-[350px] object-cover shadow-md transition-all duration-700"
        />
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/70 px-3 py-1 rounded-full backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index
                  ? "bg-emerald-700 scale-110"
                  : "bg-gray-400 opacity-50"
              } transition-all`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
