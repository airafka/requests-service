import { ReactNode } from "react";

type VerticalAnchor = "top" | "bottom";
type HorizontalAnchor = "left" | "right";

export interface TooltipType {
  anchor: {
    vertical: VerticalAnchor,
    horizontal: HorizontalAnchor,
  },
  transform: {
    vertical: VerticalAnchor,
    horizontal: HorizontalAnchor,
  }
}

export interface ITooltypeProps {
  id: string;
  item?: ReactNode;
  children?: ReactNode;
  label?: string | JSX.Element | ReactNode;
  isTranslate?: boolean;
  isDisabled?: boolean;
  tooltipType?: TooltipType;
}

