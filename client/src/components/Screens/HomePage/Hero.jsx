import React from "react";
import { assets } from "../../../assets/data";
import { FaHome, FaTools, FaRegClock } from "react-icons/fa"; // icons
import CardUI from "../../UI/CardUI";

const Hero = () => {
  const cards = [
    {
      icon: <FaHome className="text-4xl text-[#7FC68A]" />,
      title: "High Quality Properties",
      description:
        "The luxurious and exquisite design harmonious with the surrounding architecture provide the best living.",
    },
    {
      icon: <FaTools className="text-4xl text-[#7FC68A]" />,
      title: "Trusted Services",
      description:
        "Reliable professionals for construction, maintenance, and home improvement ensure top quality work.",
    },
    {
      icon: <FaRegClock className="text-4xl text-[#7FC68A]" />,
      title: "Quick & Easy Access",
      description:
        "Find, rent, or manage homes efficiently with our user-friendly platform and instant support.",
    },
  ];

  return (
    <section
      className="relative max-h-full w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${assets.bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        imageRendering: "auto",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered Content */}
      <div className="max-container relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Heading */}
        <div className="w-full md:w-[50%] pt-32 md:pt-[9rem]">
          <h1 className="hero-font text-4xl md:text-6xl font-bold text-white leading-tight">
            Find. Rent. Manage. Live Better.
          </h1>
        </div>

        {/* Subheading */}
        <div className="w-full md:w-[60%] mt-4">
          <p className="text-gray-200 text-lg md:text-xl max-w-xl mx-auto">
            Your all-in-one platform for smarter living — explore homes, manage
            rentals, and access trusted home services in one place.
          </p>
        </div>

        {/* Horizontal Line */}
        <div className="w-[90%] h-[1px] bg-gray-400 mt-[6rem] mb-[6rem] rounded-full"></div>

        {/* Area Locality + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl w-full max-w-2xl mt-2 mb-8">
          <p className="text-white text-base md:text-lg text-center md:text-left">
            Discover homes by{" "}
            <span className="text-[#7FC68A] font-semibold">locality</span> —
            find perfect properties area-wise and explore your neighborhood.
          </p>
          <button className="mt-4 md:mt-0 px-6 py-3 rounded-full bg-[#7FC68A] text-white font-semibold hover:bg-[#6bbd7f] transition-colors">
            Explore
          </button>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center mt-12 mb-12">
          {cards.map((card, index) => (
            <CardUI
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
