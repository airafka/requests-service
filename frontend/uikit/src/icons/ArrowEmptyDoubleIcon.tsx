import React from "react";

interface ArrowEmptyDoubleIconProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const ArrowEmptyDoubleIcon = ({
  width = 13,
  height = 10,
  style,
}: ArrowEmptyDoubleIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.06066 1.06066L5 0L0 5L5 10L6.06066 8.93934L2.12132 5L6.06066 1.06066Z"
      fill="#A6A5A8"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0607 1.06066L11 0L6 5L11 10L12.0607 8.93934L8.12132 5L12.0607 1.06066Z"
      fill="#A6A5A8"
    />
  </svg>
);

export default ArrowEmptyDoubleIcon;
