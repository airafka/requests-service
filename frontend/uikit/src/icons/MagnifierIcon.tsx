import React from "react";

interface MagnifierIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const MagnifierIcon: React.FC<MagnifierIconProps> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="currentColor"
        strokeWidth={0}
        d="m16.01 15.059-4.17-4.17a6.668 6.668 0 1 0-.94.942L15.067 16zm-9.321-3.054a5.326 5.326 0 1 1 0-10.652 5.326 5.326 0 0 1 0 10.652"
      />
    </svg>
  );
};

export default MagnifierIcon;
