import React from "react";

export enum ButtonType {
  default,
  light,
  outlined,
  iconOutlined,
}

export interface CustomButtonProps {
  buttonType?: ButtonType;
  isDisabled?: boolean;
  isLoad?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode | string;
  ButtonAction?: HTMLButtonElement["type"];
  form?: string;
  fullWidth?: boolean;
  dataTestId?: string;
  allowTextWrap?: boolean;
}
