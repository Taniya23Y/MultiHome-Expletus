import React, { useState, useEffect } from "react";
import Button from "../../../UI/Button";

export default function MegaMenu({ data }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  return (
    <div
      className={`max-w-4xl w-full px-4 py-6 transition-all duration-300 transform bg-gray-950 rounded-xl shadow-lg ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menu Columns */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.columns?.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.items?.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-purple-900/20"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-blue-500 to-purple-500 text-white ">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:bg-gradient-to-tr hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="col-span-1">
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-md">
            <div className="relative h-48">
              <img
                src={data.featured?.imageSrc || "/placeholder.svg"}
                alt={data.featured?.title || "Featured"}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="mb-2 font-semibold text-white">
                  {data.featured?.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {data.featured?.description}
                </p>
              </div>
              {data.featured?.ctaText && data.featured?.ctaLink && (
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-purple-700 hover:text-white transition"
                >
                  <a href={data.featured.ctaLink}>{data.featured.ctaText}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
