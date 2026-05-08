import React from "react";

interface HelpInputIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const ErrorInputIcon: React.FC<HelpInputIconProps> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        clipPath="url(#a)"
        stroke="currentColor"
      >
        <path d="M8.003 14.666a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333Z"/>
        <path
          d="M7.992 10h.006"
          strokeWidth="1.333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8V5.333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            d="M0 0h16v16H0z"
            fill="#fff"
            />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ErrorInputIcon;
