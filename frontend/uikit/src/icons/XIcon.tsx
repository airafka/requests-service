import React from "react";

interface XIconProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const XIcon: React.FC<XIconProps> = ({
  className,
  width = 21,
  height = 20,
  onClick,
  style,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    style={style}
  >
    <g clipPath="url(#clip0_359_2723)">
      <path
        d="M15.3482 4.94975L5.44869 14.8492M15.3482 14.8492L5.44869 4.94975"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_359_2723">
        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default XIcon;
