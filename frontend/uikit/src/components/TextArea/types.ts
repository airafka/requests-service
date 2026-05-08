
export type ResizeLit = 'none' | 'horizontal' | 'vertical' | 'both';

export interface TextAreaProps {
  name?: string;
  id?: string;
  cols?: number;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  value: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  wrap?: 'soft' | 'hard' | 'off';
  form?: string;
  autoComplete?: 'on' | 'off';
  spellcheck?: boolean;
  className?: string;
  error?: boolean;
  label?: string;
  hintText?: string;
  dataTestId?: string;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  resize?: ResizeLit;
}