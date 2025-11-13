import React from "react";
import MegaMenu from "./MegaMenu";

export default function NavbarDesktop({
  activeMegaMenu,
  setActiveMegaMenu,
  indicatorStyle,
  setIndicatorStyle,
  navRefs,
  menuTimeoutRef,
  isHoveringMenu,
  setIsHoveringMenu,
  megaMenuRef,
  megaMenus,
}) {
  const handleMouseEnter = (menuId) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMegaMenu(menuId);
    const navElement = navRefs.current?.[menuId];
    if (navElement) {
      const rect = navElement.getBoundingClientRect();
      const parentRect = navElement.parentElement?.getBoundingClientRect() || {
        left: 0,
      };
      setIndicatorStyle({
        width: rect.width,
        left: rect.left - parentRect.left,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    if (!isHoveringMenu) {
      menuTimeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }, 300);
    }
  };

  const handleMenuMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setIsHoveringMenu(true);
  };

  const handleMenuMouseLeave = () => {
    setIsHoveringMenu(false);
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }, 300);
  };

  const menuItems = Object.keys(megaMenus);
  const arrowLeft = indicatorStyle.left + indicatorStyle.width / 2 - 14;

  return (
    <nav className="hidden md:flex items-center gap-6 relative">
      {/* Arrow Indicator */}
      {activeMegaMenu && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            top: "100%",
            left: `${arrowLeft}px`,
            width: "18px",
            height: "13px",
            transition:
              "left 300ms cubic-bezier(0.4,0,0.2,1), top 300ms cubic-bezier(0.4,0,0.2,1)",
            background: "#a21caf",
            clipPath: "polygon(50% 0%, 0 100%, 100% 100%)",
          }}
        />
      )}

      {menuItems.map((id) => (
        <div
          key={id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (navRefs.current[id] = el)}
        >
          <button
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded hover:text-blue-900 transition ${
              activeMegaMenu === id
                ? "text-black"
                : "text-black hover:text-blue-500"
            }`}
          >
            {megaMenus[id].title}
          </button>
        </div>
      ))}

      {/* MegaMenu Dropdown */}
      {activeMegaMenu && (
        <div
          ref={megaMenuRef}
          className="absolute -left-25 right-0"
          style={{
            top: "calc(100% + 18px)",
            zIndex: 50,
            // background: "rgba(17, 15, 31, 0.95)",
            background: "#232323",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            minWidth: "max-content",
            padding: "1rem 1rem",
            borderTop: "0px solid transparent",
            borderRadius: "1rem",
            position: "absolute",
          }}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #a21caf 0%, #ec4899 100%)",
              borderRadius: "4px 4px 0 0",
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <MegaMenu data={megaMenus[activeMegaMenu]} />
          </div>
        </div>
      )}
    </nav>
  );
}
