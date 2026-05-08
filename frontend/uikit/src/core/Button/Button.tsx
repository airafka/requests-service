import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding:
          size === "small"
            ? "8px 16px"
            : size === "large"
              ? "16px 32px"
              : "12px 24px",
        fontSize:
          size === "small" ? "14px" : size === "large" ? "18px" : "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: disabled ? "#f5f5f5" : "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
};
