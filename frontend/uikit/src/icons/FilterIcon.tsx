import React from "react";

interface FilterIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const FilterIcon: React.FC<FilterIconProps> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M7.556 10.394C5.62 8.947 4.24 7.354 3.488 6.46c-.233-.277-.31-.48-.356-.837-.157-1.222-.235-1.834.123-2.228C3.614 3 4.248 3 5.515 3h8.97c1.268 0 1.901 0 2.26.395.358.394.28 1.006.123 2.228-.046.357-.123.56-.356.837-.754.896-2.136 2.49-4.075 3.94a.82.82 0 0 0-.313.581c-.192 2.124-.37 3.287-.48 3.876-.178.95-1.525 1.521-2.246 2.031-.43.304-.95-.058-1.006-.528a153 153 0 0 1-.524-5.379.82.82 0 0 0-.312-.587"
      />
    </svg>
  );
};

export default FilterIcon;
