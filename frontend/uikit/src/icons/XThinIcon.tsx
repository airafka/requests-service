import React from "react";

interface XThinIconProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: (evt: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

const XThinIcon: React.FC<XThinIconProps> = ({
  className,
  width = 16,
  height = 16,
  onClick,
  style,
}) => {
  return (
    <svg
      style={{ stroke: "#9CA3B1", ...style }}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <g clipPath="url(#clip0_112_397654)">
        <path
          d="M13.0091 2.82847L2.8268 13.0108M13.0091 13.0108L2.8268 2.82847"
          stroke="currentColor"
          strokeWidth="1.02857"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_112_397654">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default XThinIcon;
