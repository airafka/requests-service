import React from "react";

interface ChevronIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  width = 16,
  height = 16,
  color,
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color, ...style }}
    >
      <path
        d="M3 6L8 11L13 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
