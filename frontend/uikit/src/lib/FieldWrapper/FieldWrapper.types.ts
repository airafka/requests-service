export interface FieldWrapperProps {
  className?: string;
  inputId?: string;
  label?: string;
  hint?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  hasValue?: boolean;
}
