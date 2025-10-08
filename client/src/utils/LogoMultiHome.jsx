import Link from "next/link";
import Logo from "./Logo";

const LogoMultiHome = () => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-1.5 sm:gap-2 relative z-10 group"
      >
        {/* Logo Shape */}
        <div className="relative w-9 h-9 sm:w-11 sm:h-11">
          {/* Outer gradient square rotated */}
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-emerald-500 to-lime-500 rounded-xl rotate-45 transform origin-center group-hover:scale-105 transition-transform"></div>

          {/* Inner area */}
          <div className="absolute inset-[2.5px] sm:inset-[3px] bg-white rounded-xl flex items-center justify-center text-green-600 font-extrabold text-xl">
            <Logo />
          </div>
        </div>

        {/* Logo text */}
        <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 bg-clip-text text-transparent tracking-tight">
          MultiHome
        </span>
      </Link>
    </>
  );
};

export default LogoMultiHome;
