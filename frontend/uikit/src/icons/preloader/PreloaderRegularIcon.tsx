import React from "react";

interface PreloaderRegularIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const PreloaderRegularIcon: React.FC<PreloaderRegularIconProps> = ({
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
      d="M16.5 8.5C16.5 10.1894 15.9652 11.8355 14.9721 13.2023C13.9791 14.5691 12.5789 15.5864 10.9721 16.1085C9.36539 16.6305 7.63461 16.6305 6.02786 16.1085C4.42112 15.5864 3.02089 14.5691 2.02786 13.2023C1.03484 11.8355 0.5 10.1894 0.5 8.5C0.5 6.81056 1.03484 5.1645 2.02786 3.79772C3.02089 2.43094 4.42112 1.41361 6.02786 0.891548C7.63461 0.369484 9.36539 0.369484 10.9721 0.891548L10.4777 2.41324C9.19231 1.99559 7.80769 1.99559 6.52229 2.41324C5.23689 2.83089 4.11671 3.64475 3.32229 4.73817C2.52787 5.8316 2.1 7.14845 2.1 8.5C2.1 9.85155 2.52787 11.1684 3.32229 12.2618C4.11671 13.3553 5.23689 14.1691 6.52229 14.5868C7.80769 15.0044 9.19231 15.0044 10.4777 14.5868C11.7631 14.1691 12.8833 13.3553 13.6777 12.2618C14.4721 11.1684 14.9 9.85155 14.9 8.5H16.5Z"
      fill="#D9D9D9"
    />
  </svg>
);

export default PreloaderRegularIcon;
