import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[100vh] w-full">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1400&q=80"
        alt="Beautiful Home"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-20">
        {/* pt-20 to avoid navbar overlap */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Find Your Dream Home
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 max-w-xl">
          Explore the best properties, trusted services, and home solutions all
          in one platform.
        </p>
        <div className="flex mt-6 space-x-4">
          <button className="px-6 py-3 rounded-xl bg-[#7FC68A] text-white font-semibold hover:bg-black transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-200 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
