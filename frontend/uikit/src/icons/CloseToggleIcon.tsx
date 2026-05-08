import React from "react";

interface CloseToggleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CloseToggleIcon: React.FC<CloseToggleIconProps> = ({
  className,
  width = 30,
  height = 30,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.778 7.222L7.222 22.778m15.556 0L7.222 7.222"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseToggleIcon;
