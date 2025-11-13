import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Sparkles, Heart } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "../../UI/Logo";

const Footer = () => {
  return (
    <footer className="">
      {/* Main Footer Content */}
      {/* <div className="max-container mx-auto bg-gradient-to-br from-[#fbfbfb] via-[#ffffff] to-[#ffffff] text-black py-16 px-6 md:px-16"> */}
      <div className="max-container mx-auto bg-[#232323]  text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-10">
          {/* About + Goals */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <Logo />
              </h2>
              <p className="text-[15px] leading-relaxed text-gray-200">
                Your all-in-one destination to{" "}
                <span className="text-emerald-500 font-semibold">
                  find, rent, sell, and manage
                </span>{" "}
                homes. Bridging the gap between owners, renters, and service
                providers with trust and transparency.
              </p>
              <p className="mt-2 italic text-blue-400 font-medium text-sm tracking-wide">
                “Find. Rent. Sell. Manage. Live Better.”
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-emerald-400 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-300 font-medium">
              {[
                "Find Properties",
                "Rent or Sell",
                "Home Services",
                "About us",
                "Contact Us",
                "Sitemap",
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="relative hover:text-blue-500 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-emerald-400 pl-3">
              Popular Areas in Indore
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-300 font-medium text-sm">
              {[
                "Vijay Nagar",
                "Palasia",
                "Bhawarkua",
                "Rau",
                "Rajendra Nagar",
                "Scheme No. 78",
                "AB Road",
                "MR 10",
                "Geeta Bhawan",
                "Nipania",
                "Super Corridor",
                "Mahalaxmi Nagar",
                "Lalaram Nagar",
                "Scheme No 54 ",
                "Vishnupuri",
                "Chandan Nagar",
              ].map((area, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:text-emerald-500 transition-all hover:translate-x-1"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-emerald-400 pl-3">
              Support
            </h3>
            <ul className="space-y-3 text-gray-300 font-medium text-sm md:text-base">
              {[
                "Customer Support",
                "FAQs",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="relative hover:text-blue-500 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-3">
                Connect With Us
              </h4>
              <div className="flex gap-5 text-xl">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="hover:text-emerald-500 transition transform hover:scale-125 hover:-translate-y-1"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-br from-[#152860] via-[#1B2F70] to-[#0A1931] py-5 px-6 md:px-16 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-sm text-gray-400">
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">MultiHome</span>. All
              rights reserved.
            </p>
            <span className="hidden md:inline text-gray-500">|</span>
            <p className="flex items-center gap-1">
              Built with
              <Heart className="text-red-500 animate-pulse w-4 h-4" />
              by
              <span className="text-emerald-400 font-semibold">
                Taniya Yadav
              </span>
              .
            </p>
          </div>

          {/* Right Section */}
          <div className="mt-2 md:mt-0">
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 bg-[#2B5FEA] text-white cursor-pointer font-medium px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_12px_rgba(43,95,234,0.7)] active:scale-95"
            >
              <Sparkles className="text-yellow-400 text-sm animate-pulse" />
              <span>Explore Properties</span>
              <FaArrowRightLong className="text-white text-base transform transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
