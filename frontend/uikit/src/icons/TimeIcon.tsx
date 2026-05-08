import React from "react";

interface TimeIconProps {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const TimeIcon: React.FC<TimeIconProps> = ({
  className,
  width = 16,
  height = 16,
  onClick,
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
      onClick={onClick}
      style={style}
    >
      <path
        d="M8 0.00292969C3.58214 0.00292969 0 3.58507 0 8.00293C0 12.4208 3.58214 16.0029 8 16.0029C12.4179 16.0029 16 12.4208 16 8.00293C16 3.58507 12.4179 0.00292969 8 0.00292969ZM8 14.6458C4.33214 14.6458 1.35714 11.6708 1.35714 8.00293C1.35714 4.33507 4.33214 1.36007 8 1.36007C11.6679 1.36007 14.6429 4.33507 14.6429 8.00293C14.6429 11.6708 11.6679 14.6458 8 14.6458Z"
        fill="currentColor"
      />
      <path
        d="M11.1198 10.262L8.57335 8.4209V4.00126C8.57335 3.92268 8.50907 3.8584 8.4305 3.8584H7.57157C7.493 3.8584 7.42871 3.92268 7.42871 4.00126V8.91911C7.42871 8.96554 7.45014 9.0084 7.48764 9.03518L10.4412 11.1888C10.5055 11.2352 10.5948 11.2209 10.6412 11.1584L11.1519 10.462C11.1984 10.3959 11.1841 10.3066 11.1198 10.262Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TimeIcon;
