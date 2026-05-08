import React from "react";

interface CheckCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({
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
      <rect width="20" height="20" rx="10" fill="currentColor" />
      <path
        d="M9.05297 12.3858C8.91964 12.3858 8.79297 12.3324 8.69964 12.2391L6.81297 10.3524C6.61964 10.1591 6.61964 9.83909 6.81297 9.64576C7.0063 9.45242 7.3263 9.45242 7.51964 9.64576L9.05297 11.1791L12.4796 7.75242C12.673 7.55909 12.993 7.55909 13.1863 7.75242C13.3796 7.94576 13.3796 8.26575 13.1863 8.45909L9.4063 12.2391C9.31297 12.3324 9.1863 12.3858 9.05297 12.3858Z"
        fill="white"
      />
    </svg>
  );
};

export default CheckCircleIcon;
