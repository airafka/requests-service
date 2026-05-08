import React from "react";

interface PlusCircleIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const PlusCircleIcon: React.FC<PlusCircleIconProps> = ({
  width = 20,
  height = 20,
  color,
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color, ...style }}
    >
      <path
        d="M10.0002 12.9696L10.0005 7.03015M7.03096 10.0003L12.9703 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0033 9.99991C17.0033 6.13391 13.8692 2.99991 10.0033 2.99991C6.13727 2.99991 3.00327 6.13391 3.00327 9.99991C3.00327 13.8659 6.13727 16.9999 10.0033 16.9999C13.8692 16.9999 17.0033 13.8659 17.0033 9.99991Z"
        stroke="currentColor"
      />
    </svg>
  );
};

export default PlusCircleIcon;
