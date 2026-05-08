export enum ChevronDirection {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export interface ChevronProps {
  direction?: ChevronDirection;
  size?: number;
  color?: string;
  className?: string;
  dataTestId?: string;
  hover?: boolean;
}
