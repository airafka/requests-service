import React from "react";

interface CircleIconProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CircleIcon: React.FC<CircleIconProps> = ({
  className,
  width = 20,
  height = 20,
  onClick,
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
      onClick={onClick}
      style={style}
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="9.5"
        fill="currentColor"
      />
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="9.5"
        stroke="currentColor"
      />
      <circle cx="10" cy="10" r="2" fill="white" />
    </svg>
  );
};

export default CircleIcon;
