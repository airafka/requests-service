import React from "react";

const RussianFlagDisabled: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Светло-серая полоса (верхняя) */}
      <rect x="0" y="0" width="16" height="3.67" fill="#F9FAFC" stroke="none" />
      {/* Средне-серая полоса (средняя) - из Figma */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.67H16V7.33H0V3.67Z"
        fill="#D8DDE3"
        stroke="none"
      />
      {/* Тёмно-серая полоса (нижняя) - из Figma */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.33H16V11H0V7.33Z"
        fill="#A6A5A8"
        stroke="none"
      />
      {/* Тонкая рамка вокруг флага */}
      <rect
        x="0.04"
        y="0.04"
        width="15.92"
        height="10.92"
        fill="none"
        stroke="#D8DDE3"
        strokeWidth="0.08"
      />
    </svg>
  );
};

export default RussianFlagDisabled;
