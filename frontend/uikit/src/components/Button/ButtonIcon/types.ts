import { Theme } from "@mui/material/styles";

export enum ButtonSize {
  Small = "small",
  Regular = "regular",
}
export enum ButtonIconType {
  Default = "default",
  Light = "light",
}
export enum ButtonIconColor {
  Primary = "Primary",
  Error = "Error",
  Success = "Success",
  Gray = "Gray",
}

export interface StyleProps {
  theme: Theme;
  size: ButtonSize;
  buttonType: ButtonIconType;
}

export interface ButtonIconProps {
  icon: React.ReactElement;
  onClick: () => void;
  size?: ButtonSize;
  buttonType?: ButtonIconType;
  className?: string;
  isDisabled?: boolean;
  color?: ButtonIconColor;
  dataTestId?: string;
}
