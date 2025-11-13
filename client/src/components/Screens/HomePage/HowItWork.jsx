/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Eye,
  CreditCard,
  Wrench,
  Upload,
  CheckCircle2,
  HandCoins,
  Home,
  MapPin,
  Search,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";

const buyerSteps = [
  {
    id: 1,
    title: "Search for a Multi (Society / Building)",
    desc: "Start by searching for a Multi near your preferred location using our smart filters or the map view.",
    icon: <Search className="w-8 h-8 text-blue-500" />,
    color: "from-blue-200/40 to-blue-100/10",
  },
  {
    id: 2,
    title: "Choose a Multi on MultiHome",
    desc: "Select from verified societies or buildings that meet your requirements — verified and trustworthy.",
    icon: <Building2 className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-200/40 to-indigo-100/10",
  },
  {
    id: 3,
    title: "Explore Homes & Flats",
    desc: "Browse through detailed listings with photos, pricing, amenities, and owner details.",
    icon: <Eye className="w-8 h-8 text-purple-500" />,
    color: "from-purple-200/40 to-purple-100/10",
  },
  {
    id: 4,
    title: "View Homes on Map",
    desc: "Use our map integration to view home locations, nearby landmarks, and routes in real-time.",
    icon: <MapPin className="w-8 h-8 text-rose-500" />,
    color: "from-rose-200/40 to-rose-100/10",
  },
  {
    id: 5,
    title: "Book Visits Instantly",
    desc: "Schedule an in-person or virtual visit with just one click — directly from the listing.",
    icon: <Home className="w-8 h-8 text-green-500" />,
    color: "from-green-200/40 to-green-100/10",
  },
  {
    id: 6,
    title: "Pay Rent or Buy Securely Online",
    desc: "Complete transactions safely using MultiHome’s secure and verified payment gateway.",
    icon: <CreditCard className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-200/40 to-emerald-100/10",
  },
  {
    id: 7,
    title: "Hire Local Helpers Instantly",
    desc: "Need help moving in or maintenance? Instantly hire trusted local electricians, plumbers, or cleaners.",
    icon: <Wrench className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-200/40 to-yellow-100/10",
  },
];

const sellerSteps = [
  {
    id: 1,
    title: "List Your Property",
    desc: "Create your seller profile, upload property details, and set pricing easily.",
    icon: <Upload className="w-8 h-8 text-pink-500" />,
    color: "from-pink-200/40 to-pink-100/10",
  },
  {
    id: 2,
    title: "Get Verified by MultiHome",
    desc: "Our team verifies every listing to ensure authenticity and trust for buyers.",
    icon: <CheckCircle2 className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-200/40 to-indigo-100/10",
  },
  {
    id: 3,
    title: "Connect with Buyers",
    desc: "Chat directly with buyers, schedule visits, and answer queries in real-time.",
    icon: <HandCoins className="w-8 h-8 text-cyan-500" />,
    color: "from-cyan-200/40 to-cyan-100/10",
  },
  {
    id: 4,
    title: "Sell Securely Online",
    desc: "Receive payments safely through trusted payment systems — quick and easy.",
    icon: <Home className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-200/40 to-emerald-100/10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

export default function HowItWork() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative background glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide shadow-md">
            <Zap className="w-4 h-4" /> Smart & Simple{" "}
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-5xl font-extrabold mt-4 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MultiHome makes renting, buying, and selling homes smooth and secure
            with real-time features designed for both{" "}
            <span className="font-semibold text-blue-600">Buyers</span> and{" "}
            <span className="font-semibold text-purple-600">Sellers</span>.
          </p>
        </motion.div>

        {/* Buyer Flow */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">
            For Buyers & Renters
          </h3>

          <motion.div
            className="relative flex flex-wrap justify-center gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {buyerSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -8 }}
                className={`relative bg-gradient-to-br ${step.color} rounded-2xl p-6 w-[260px] text-center backdrop-blur-md shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500`}
              >
                {/* Number */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  {step.id}
                </div>

                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 shadow-md mb-4 mx-auto">
                  {step.icon}
                </div>

                <h4 className="font-semibold text-gray-800 mb-2 text-[15px]">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>

                {/* Arrow to next step */}
                {i !== buyerSteps.length - 1 && (
                  <motion.div
                    className="hidden sm:block absolute right-[-40px] top-1/2 -translate-y-1/2 text-blue-400"
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-7 h-7" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Seller Flow */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">
            For Sellers
          </h3>

          <motion.div
            className="relative flex flex-wrap justify-center gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {sellerSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -8 }}
                className={`relative bg-gradient-to-br ${step.color} rounded-2xl p-6 w-[260px] text-center backdrop-blur-md shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500`}
              >
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  {step.id}
                </div>

                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 shadow-md mb-4 mx-auto">
                  {step.icon}
                </div>

                <h4 className="font-semibold text-gray-800 mb-2 text-[15px]">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>

                {i !== sellerSteps.length - 1 && (
                  <motion.div
                    className="hidden sm:block absolute right-[-40px] top-1/2 -translate-y-1/2 text-purple-400"
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-7 h-7" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
