export enum FontWeight {
  Regular = 400,
  Medium = 500,
  Semibold = 600,
}

export type FontSize = 8 | 10 | 12 | 14 | 16 | 20 | 24;

export interface TextLabelProps {
  size: FontSize;
  weight: FontWeight;
  text?: string;
  className?: string;
  required?: boolean;
  withColon?: boolean;
  error?: boolean;
}
