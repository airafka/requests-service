import React from "react";

interface PreloaderSemiboldIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const PreloaderSemiboldIcon: React.FC<PreloaderSemiboldIconProps> = ({
  width = "16",
  height = "16",
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5 8.5C16.5 10.1894 15.9652 11.8355 14.9721 13.2023C13.9791 14.5691 12.5789 15.5864 10.9721 16.1085C9.36539 16.6305 7.63461 16.6305 6.02786 16.1085C4.42112 15.5864 3.02089 14.5691 2.02786 13.2023C1.03484 11.8355 0.5 10.1894 0.5 8.5C0.5 6.81056 1.03484 5.1645 2.02786 3.79772C3.02089 2.43094 4.42112 1.41361 6.02786 0.891548C7.63461 0.369484 9.36539 0.369484 10.9721 0.891548L10.2799 3.02191C9.12308 2.64603 7.87692 2.64603 6.72006 3.02191C5.5632 3.3978 4.55504 4.13027 3.84006 5.11436C3.12508 6.09844 2.74 7.28361 2.74 8.5C2.74 9.71639 3.12508 10.9016 3.84006 11.8856C4.55504 12.8697 5.5632 13.6022 6.72006 13.9781C7.87692 14.354 9.12308 14.354 10.2799 13.9781C11.4368 13.6022 12.445 12.8697 13.1599 11.8856C13.8749 10.9016 14.26 9.71639 14.26 8.5H16.5Z"
      fill="#D9D9D9"
    />
  </svg>
);

export default PreloaderSemiboldIcon;
