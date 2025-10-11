import React from "react";
import { assets } from "../../../assets/data"; // your image path source

const Features = () => {
  return (
    <section className="relative w-screen mx-auto mt-[-8rem] bg-gradient-to-br from-[#F7F7F7] to-[#E8F5E9] py-20 px-6 md:px-16 rounded-tl-4xl rounded-tr-4xl shadow-xl border border-gray-200">
      {/* ========== FIRST ROW ========== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-[12rem]">
        {/* Left Button Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <button className="px-10 py-6 bg-[#7FC68A] text-white text-lg font-semibold rounded-3xl shadow-lg hover:bg-[#4B6043] transition-all">
            Explore MultiHome Features
          </button>
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 flex flex-col text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            The Future of Home Living — Simplified, Smart & Connected
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            MultiHome is India’s first integrated home ecosystem that connects
            property seekers, owners, and service professionals — bringing
            everything home-related into one seamless digital experience.
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-10 mt-12">
            <div className="flex-1 bg-white rounded-2xl shadow-md p-6 hover:scale-[1.02] transition-all border-t-4 border-[#7FC68A]">
              <h3 className="text-xl font-semibold text-[#4B6043] mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize how people find, rent, and manage homes —
                creating a trusted digital space where comfort meets convenience
                and innovation drives everyday living.
              </p>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-md p-6 hover:scale-[1.02] transition-all border-t-4 border-[#7FC68A]">
              <h3 className="text-xl font-semibold text-[#4B6043] mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower homeowners, tenants, and service providers with a
                transparent, efficient, and technology-driven platform that
                makes home management effortless.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Second ROW (Image + Stats Cards) ========== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-16">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.heroHomeImage}
            alt="MultiHome Preview"
            className="w-full max-w-md rounded-3xl shadow-lg object-cover"
          />
        </div>

        {/* Right Stats Section */}
        <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-2 gap-6">
          {[
            { label: "Listed Homes", value: "2.5K+" },
            { label: "Active Rentals", value: "1.2K+" },
            { label: "Verified Areas", value: "150+" },
            { label: "Happy Users", value: "10K+" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#7FC68A] to-[#4B6043] text-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              <span className="text-2xl font-bold">{item.value}</span>
              <span className="text-sm text-white/90">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
