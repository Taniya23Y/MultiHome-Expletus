/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "../../../assets/data.js";
import {
  MapPin,
  ShieldCheck,
  Home,
  MessageCircle,
  CreditCard,
  Sparkles,
  Headphones,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Smart Map Integration",
    desc: "Explore nearby homes with interactive map view and location filters.",
    icon: <MapPin className="w-6 h-6 text-blue-500" />,
    img: assets.MapIntegrationImage,
    color: "from-blue-200/30 to-blue-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-blue-600/40",
  },
  {
    id: 2,
    title: "Verified Property Listings",
    desc: "Every property is verified by our team to ensure safety and authenticity.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    img: assets.VerifiedPropertyImage,
    color: "from-purple-200/30 to-purple-100/10",
    hoverColor: "hover:bg-[#D4ABE3]",
  },
  {
    id: 3,
    title: "Buy, Rent & Sell Homes",
    desc: "All-in-one platform to buy, rent, or sell your dream property hassle-free.",
    icon: <Home className="w-6 h-6 text-green-500" />,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    color: "from-green-200/30 to-green-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-green-500/30 hover:to-green-600/40",
  },
  {
    id: 4,
    title: "Real-Time Chat System",
    desc: "Instant chat between buyers, sellers, and agents for faster communication.",
    icon: <MessageCircle className="w-6 h-6 text-yellow-500" />,
    img: assets.RealTimeChatImage,
    color: "from-yellow-200/30 to-yellow-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-yellow-500/30 hover:to-yellow-600/40",
  },
  {
    id: 5,
    title: "Secure Online Payment Integration",
    desc: "Integrated with trusted payment gateways for safe and fast transactions.",
    icon: <CreditCard className="w-6 h-6 text-pink-500" />,
    img: assets.SendPaymentImage,
    color: "from-pink-200/30 to-pink-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-pink-500/30 hover:to-pink-600/40",
  },
  {
    id: 6,
    title: "AI-Powered Home Recommendations",
    desc: "Get personalized home suggestions based on your preferences and location.",
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
    img: assets.RecommendationHomeImage,
    color: "from-indigo-200/30 to-indigo-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-indigo-500/30 hover:to-indigo-600/40",
  },
  {
    id: 7,
    title: "Smart Filters & 24/7 Support",
    desc: "Easily sort listings and get 24/7 customer and technical assistance anytime.",
    icon: <Headphones className="w-6 h-6 text-cyan-500" />,
    img: assets.SupportImageImage,
    color: "from-cyan-200/30 to-cyan-100/10",
    hoverColor:
      "hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-cyan-600/40",
  },
];

const CoreFeature = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section className="container py-10 relative" id="features">
      <div className="max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how{" "}
            <span className="font-semibold text-gray-800">MultiHome</span> makes
            property management and discovery simpler, faster, and smarter.
          </p>
        </div>

        {/* Feature Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              transition={{ duration: 0.4 }}
              className={`flex-shrink-0 hover:cursor-pointer w-[100%] lg:w-[280px] bg-gradient-to-br ${feature.color} backdrop-blur-lg rounded-2xl border border-gray-400/40 hover:border-gray-700/60 ${feature.hoverColor} transition-all duration-500 relative p-3`}
            >
              {/* Image */}
              <div className="h-30 overflow-hidden rounded-t-xl">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-102"
                />
              </div>

              {/* Content */}
              <div className="p-1 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-white/60 backdrop-blur-md shadow-inner">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Circle Arrow */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                className="absolute bottom-5 right-5 p-3 bg-white/70 backdrop-blur-md shadow-md rounded-full cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={scrollLeft}
            className="p-2 cursor-pointer bg-white/70 hover:bg-black hover:text-white backdrop-blur-md shadow-md rounded-full hover:scale-110 transition"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 cursor-pointer bg-white/70 hover:bg-black hover:text-white backdrop-blur-md shadow-md rounded-full hover:scale-110 transition"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoreFeature;
