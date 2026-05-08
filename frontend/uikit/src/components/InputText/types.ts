import { SxProps, Theme } from "@mui/material";
export type InputFontSize = 14 | 16 | 20 | 24;

export type IconStartBehavior = "dynamic" | "static";

export interface ColorsProps {
  borderColor?: {
    default: string;
    hover: string;
    focus: string;
  };
}

export interface InputTextProps extends ColorsProps{
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
  dataTestId?: string;
  borderRadius?: number;
  max?: number;
  min?: number;
  type?: "number" | "text" | "date" | "email" | "password";
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
  hintText?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  autoFocus?: boolean;
  autoComplete?: string;
  iconStartBehavior?: IconStartBehavior;
  allowOnlyAlphanumeric?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  isTable?: boolean;
}
