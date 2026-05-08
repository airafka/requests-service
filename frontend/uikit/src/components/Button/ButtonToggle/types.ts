import React from "react";

export interface ToggleOption<T = string> {
  value: T;
  label: React.ReactNode | string;
  disabled?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
  allowTextWrap?: boolean;
}

export enum ToggleSize {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum ToggleColor {
  standard = "standard",
  primary = "primary",
  secondary = "secondary",
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

export interface ButtonToggleProps<T = string> {
  options: ToggleOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  exclusive?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ToggleSize;
  color?: ToggleColor;
  className?: string;
  dataTestId?: string;
  ariaLabel?: string;
}
