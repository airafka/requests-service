import React from "react";

interface DownloadToggleProps {
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}

const DownloadToggleIcon: React.FC<DownloadToggleProps> = ({
  width = 30,
  height = 30,
  color = "#3472ED",
  style,
}) => {
  return (
    <svg
      style={{ stroke: color, ...style }}
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0022 18.1427V5.57129M15.0022 18.1427C14.122 18.1427 12.4773 15.6356 11.8594 14.9999M15.0022 18.1427C15.8825 18.1427 17.5272 15.6356 18.1451 14.9999"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 19.7144C26 23.6146 25.2878 24.4286 21.875 24.4286H8.125C4.71225 24.4286 4 23.6146 4 19.7144"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadToggleIcon;
