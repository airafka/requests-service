import { ChipOwnProps } from "@mui/material";

export enum colorBadge {
  gray,
  purple,
  red,
  yellow,
  green,
  blue,
  lightGreen,
  lightPurple,
  lightYellow,
  lightRed,
  softGreen,
  darkGray,
  loading,
}

export type BadgeType = "default" | "loading";

export interface BadgeProps extends Omit<ChipOwnProps, "color" | "size"> {
  type?: BadgeType;
  color?: colorBadge;
  maxWidth?: number;
  text?: string;
  hasDot?: boolean;
  hasHint?: boolean;
  onClick?: (index?: number) => void;
  index?: number;
  customClassName?: string;
  onDelete?: (index?: number) => void;
  className?: string;
  hiddenBadgeDeleteIcon?: boolean;
  dataTestId?: string;
}
