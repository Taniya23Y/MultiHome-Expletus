/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle2,
  HandCoins,
  Home,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";

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

export default function HowItWorks() {
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
            with real-time features designed for
            <span className="font-semibold text-purple-600">Sellers</span>.
          </p>
        </motion.div>

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
