import React from "react";

const IndeterminateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17 10H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  );
};

export default IndeterminateIcon;
