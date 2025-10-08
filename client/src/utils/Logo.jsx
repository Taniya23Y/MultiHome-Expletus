import React from "react";

const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="80"
      height="80"
      fill="none"
    >
      <defs>
        <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#b8f84b" />
          <stop offset="100%" stop-color="#27b233" />
        </linearGradient>
      </defs>

      {/* Replace this path with your exact traced SVG path */}
      <path
        d="M256 64L64 192h64v192a32 32 0 0 0 32 32h96v-64h-64V224h192v128h-64v64h96a32 32 0 0 0 32-32V192h64L256 64z"
        stroke="url(#greenGradient)"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M208 352v-64a48 48 0 1 1 96 0v64"
        stroke="url(#greenGradient)"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default Logo;
