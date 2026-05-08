import React from "react";

interface MailInputIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const MailInputIcon: React.FC<MailInputIconProps> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.498 3.5c0-.825-.675-1.5-1.5-1.5h-12c-.825 0-1.5.675-1.5 1.5m15 0v9c0 .825-.675 1.5-1.5 1.5h-12c-.825 0-1.5-.675-1.5-1.5v-9m15 0-7.5 5.25-7.5-5.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MailInputIcon;
