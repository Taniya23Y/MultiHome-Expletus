import React from "react";
import { Home, Building2, Landmark, Hotel, Layers } from "lucide-react";

const CategoryUI = () => {
  const categoryList = [
    { id: 1, name: "Residential", icon: Home, count: "120+ listings" },
    { id: 2, name: "Commercial", icon: Building2, count: "80+ listings" },
    { id: 3, name: "Plots & Land", icon: Landmark, count: "42+ listings" },
    { id: 4, name: "Hostel", icon: Hotel, count: "30+ listings" },
    { id: 5, name: "PG/Room", icon: Layers, count: "55+ listings" },
    { id: 6, name: "Office Space", icon: Building2, count: "63+ listings" },
    { id: 7, name: "Industrial", icon: Landmark, count: "22+ listings" },
    { id: 8, name: "Shops", icon: Home, count: "14+ listings" },
    { id: 9, name: "Warehouses", icon: Layers, count: "28+ listings" },
    { id: 10, name: "Other", icon: Home, count: "10+ listings" },
  ];

  const colors = [
    { bg: "bg-blue-100", border: "border-blue-400", icon: "text-blue-700" },
    {
      bg: "bg-purple-100",
      border: "border-purple-400",
      icon: "text-purple-700",
    },
    { bg: "bg-green-100", border: "border-green-400", icon: "text-green-700" },
    {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      icon: "text-yellow-700",
    },
    {
      bg: "bg-orange-100",
      border: "border-orange-400",
      icon: "text-orange-700",
    },
    { bg: "bg-cyan-100", border: "border-cyan-400", icon: "text-cyan-700" },
    { bg: "bg-red-100", border: "border-red-400", icon: "text-red-700" },
    { bg: "bg-pink-100", border: "border-pink-400", icon: "text-pink-700" },
    { bg: "bg-teal-100", border: "border-teal-400", icon: "text-teal-700" },
    { bg: "bg-gray-200", border: "border-gray-500", icon: "text-gray-700" },
  ];

  return (
    <section className="w-full mt-16 px-6 md:px-10 lg:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Browse by Category
      </h2>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {categoryList.map((item, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={item.id}
              className={`
                group relative rounded-xl p-[1px] cursor-pointer
                transition-all duration-300 hover:-translate-y-1
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                ${color.border} border
                ${color.bg}
              `}
            >
              <div className="rounded-xl bg-white/60 backdrop-blur-xl p-3 h-full">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-3
                    bg-white/70 shadow-inner group-hover:scale-105
                    transition-all duration-300
                  `}
                >
                  <item.icon className={`w-5 h-5 ${color.icon}`} />
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE SLIDER */}
      <div className="md:hidden flex gap-3 overflow-x-auto hide-scrollbar py-3">
        {categoryList.map((item, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={item.id}
              className={`
                min-w-[140px] flex-shrink-0 rounded-xl p-[1px]
                cursor-pointer transition-all duration-300
                hover:-translate-y-1 shadow-md
                ${color.bg} ${color.border} border
              `}
            >
              <div className="rounded-xl bg-white/60 backdrop-blur-xl p-3">
                <div
                  className={`
                    w-10 h-10 rounded-xl bg-white/70 
                    flex items-center justify-center mb-2 shadow-inner
                  `}
                >
                  <item.icon className={`w-5 h-5 ${color.icon}`} />
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryUI;
