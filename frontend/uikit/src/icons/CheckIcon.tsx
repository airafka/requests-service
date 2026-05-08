import React from "react";

interface CheckIconProps {
  color?: string;
  size?: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({ color, size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color || "#16C17C" }}
    >
      <path
        d="M2.5 7.5L8.75 14.1667L17.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
