import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  BarChart3,
  Settings,
  FileText,
  Zap,
  Home,
  Building2,
  Phone,
  User,
  ChevronDown,
  Calculator,
  ClipboardList,
  PlusCircle,
  ClipboardCheck,
  CreditCard,
} from "lucide-react";
import Logo from "../../../UI/Logo";
import { assets } from "../../../../assets/data";
import NavbarDesktop from "./NavbarDesktop";
import NavbarActions from "./NavbarActions";
import NavbarMobile from "./NavbarMobile";
import Button from "../../../UI/Button";
import { useLocation } from "react-router-dom";
import SellerNavbarActions from "./SellerNavbarActions";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuTimeoutRef = useRef(null);
  const navRefs = useRef({});
  const megaMenuRef = useRef(null);

  const location = useLocation();
  const isSellerPage = location.pathname.startsWith("/become-a-seller");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const megaMenus = {
    buyer: {
      title: "For Buyer",
      columns: [
        {
          title: "Explore Homes",
          items: [
            {
              icon: <Home className="h-5 w-5" />,
              title: "Buy Property",
              description: "Find homes for sale near you",
              href: "/buy",
            },
            {
              icon: <Building2 className="h-5 w-5" />,
              title: "Commercial Spaces",
              description: "Shop or office spaces for business",
              href: "/commercial",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              title: "Luxury Listings",
              description: "Explore premium & exclusive properties",
              href: "/luxury",
            },
          ],
        },
        {
          title: "Buyer Tools",
          items: [
            {
              icon: <BarChart3 className="h-5 w-5" />,
              title: "Compare Properties",
              description: "Analyze features & pricing side by side",
              href: "/compare",
            },
            {
              icon: <Calculator className="h-5 w-5" />,
              title: "Loan & EMI Calculator",
              description: "Estimate monthly payments easily",
              href: "/calculator",
            },
            {
              icon: <FileText className="h-5 w-5" />,
              title: "Buyer Guides",
              description: "Learn how to buy your dream home smartly",
              href: "/guides",
            },
          ],
        },
      ],
      featured: {
        title: "Find Your Dream Home",
        description: "Discover the perfect property tailored to you",
        ctaText: "Browse Homes",
        ctaLink: "/buy",
        imageSrc: assets.bgImage,
      },
    },

    renter: {
      title: "For Renter",
      columns: [
        {
          title: "Rental Options",
          items: [
            {
              icon: <Home className="h-5 w-5" />,
              title: "Apartments",
              description: "Affordable & premium rental apartments",
              href: "/rent",
            },
            {
              icon: <Building2 className="h-5 w-5" />,
              title: "PG & Hostels",
              description: "Safe, verified, and budget-friendly stays",
              href: "/pg-hostel",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Shared Flats",
              description: "Find roommates & shared accommodations",
              href: "/shared-flats",
            },
          ],
        },
        {
          title: "Rental Tools",
          items: [
            {
              icon: <ClipboardList className="h-5 w-5" />,
              title: "Post Rental Requirement",
              description: "Tell us what you’re looking for",
              href: "/post-requirement",
            },
            {
              icon: <FileText className="h-5 w-5" />,
              title: "Rental Agreement",
              description: "Digital rent agreements made easy",
              href: "/rental-agreement",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              title: "Tenant Tips",
              description: "Guides for first-time renters",
              href: "/renter-guides",
            },
          ],
        },
      ],
      featured: {
        title: "Easy Rentals",
        description: "Rent faster with verified listings",
        ctaText: "Find Rentals",
        ctaLink: "/rent",
        imageSrc: assets.bgImage,
      },
    },

    owner: {
      title: "For Owner",
      columns: [
        {
          title: "Property Management",
          items: [
            {
              icon: <PlusCircle className="h-5 w-5" />,
              title: "List Property",
              description: "Post your property for sale or rent",
              href: "/list-property",
            },
            {
              icon: <BarChart3 className="h-5 w-5" />,
              title: "Track Analytics",
              description: "Monitor your listing performance",
              href: "/analytics",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Manage Leads",
              description: "View & respond to buyer inquiries",
              href: "/leads",
            },
          ],
        },
        {
          title: "Owner Tools",
          items: [
            {
              icon: <ClipboardCheck className="h-5 w-5" />,
              title: "Verify Property",
              description: "Get your property verified easily",
              href: "/verify-property",
            },
            {
              icon: <CreditCard className="h-5 w-5" />,
              title: "Earnings & Payments",
              description: "View rent or sale earnings securely",
              href: "/earnings",
            },
            {
              icon: <Settings className="h-5 w-5" />,
              title: "Manage Listings",
              description: "Update, remove, or edit your posts",
              href: "/my-properties",
            },
          ],
        },
      ],
      featured: {
        title: "Earn with Ease",
        description: "Reach thousands of buyers & tenants instantly",
        ctaText: "List Now",
        ctaLink: "/list-property",
        imageSrc: assets.bgImage,
      },
    },

    insights: {
      title: "Insights",
      columns: [
        {
          title: "Market Updates",
          items: [
            {
              icon: <BarChart3 className="h-5 w-5" />,
              title: "Price Trends",
              description: "See property value changes",
              href: "/insights-info",
            },
            {
              icon: <FileText className="h-5 w-5" />,
              title: "Guides & Tips",
              description: "Learn from experts and insights",
              href: "/insights-info",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              title: "Investment Advice",
              description: "Make smart real estate decisions",
              href: "/insights-info",
            },
          ],
        },
      ],
      featured: {
        title: "Smart Insights",
        description: "Stay updated with real estate trends",
        ctaText: "Explore Now",
        ctaLink: "/insights-info",
        imageSrc: assets.bgImage,
      },
    },

    contact: {
      title: "Contact Us",
      columns: [
        {
          title: "Get in Touch",
          items: [
            {
              icon: <Phone className="h-5 w-5" />,
              title: "Customer Support",
              description: "We’re here to help 24/7",
              href: "/contact-us",
            },
            {
              icon: <User className="h-5 w-5" />,
              title: "Join as Partner",
              description: "Collaborate with our platform",
              href: "/contact-us",
            },
          ],
        },
      ],
      featured: {
        title: "Let's Connect",
        description: "Have queries? Our team is ready to assist you.",
        ctaText: "Contact Now",
        ctaLink: "/contact-us",
        imageSrc: assets.bgImage,
      },
    },
  };

  return (
    <header
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 
    bg-white
    ${scrolled ? "rounded-2xl w-[99%] px-1 shadow-lg" : "w-full px-0 shadow-lg"}
  `}
    >
      {/* Desktop Navbar */}
      <div className="max-container flex h-16 items-center justify-between px-4 md:px-8">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-2">
          <Logo />

          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-1 cursor-pointer hover:text-black font-medium"
            >
              Indore <ChevronDown className="w-4 h-4" />
            </button>

            {cityOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg w-36 p-2 z-[9999]">
                {["Vijay Nagar", "LIG", "Bhanwarkuan", "Silicon City"].map(
                  (city) => (
                    <button
                      key={city}
                      className="w-full text-left px-3 py-2 cursor-pointer hover:bg-black hover:text-white rounded-md text-sm"
                      onClick={() => setCityOpen(false)}
                    >
                      {city}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <NavbarDesktop
            activeMegaMenu={activeMegaMenu}
            setActiveMegaMenu={setActiveMegaMenu}
            indicatorStyle={indicatorStyle}
            setIndicatorStyle={setIndicatorStyle}
            navRefs={navRefs}
            menuTimeoutRef={menuTimeoutRef}
            isHoveringMenu={isHoveringMenu}
            setIsHoveringMenu={setIsHoveringMenu}
            megaMenuRef={megaMenuRef}
            megaMenus={megaMenus}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2">
          {!isSellerPage && (
            <Button
              label="Become a Seller"
              variant="outline"
              size="sm"
              rounded="xl"
              href="/become-a-seller"
              hideTextOnMobile={true}
              hideIconOnMobile={false}
            />
          )}

          {!isSellerPage ? (
            <NavbarActions
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          ) : (
            <SellerNavbarActions
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <NavbarMobile
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          megaMenus={megaMenus}
        />
      </div>
    </header>
  );
}
