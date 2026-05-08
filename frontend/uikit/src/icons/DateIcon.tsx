import React from "react";

interface DateIconProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

const DateIcon = ({
  width = 18,
  height = 20,
  style,
  onClick,
  className,
}: DateIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    style={style}
  >
    <path
      d="M14.054 1.5791V3.26331M3.94873 1.5791V3.26331"
      stroke="currentColor"
      strokeWidth="1.26316"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.00781 10.2046C1.00781 6.53537 1.00781 4.70071 2.06223 3.56081C3.11665 2.4209 4.8137 2.4209 8.20781 2.4209H9.80781C13.2019 2.4209 14.899 2.4209 15.9534 3.56081C17.0078 4.70071 17.0078 6.53537 17.0078 10.2046V10.6372C17.0078 14.3065 17.0078 16.1411 15.9534 17.281C14.899 18.4209 13.2019 18.4209 9.80781 18.4209H8.20781C4.8137 18.4209 3.11665 18.4209 2.06223 17.281C1.00781 16.1411 1.00781 14.3065 1.00781 10.6372V10.2046Z"
      stroke="currentColor"
      strokeWidth="1.26316"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.42236 6.63135H16.5803"
      stroke="currentColor"
      strokeWidth="1.26316"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DateIcon;
