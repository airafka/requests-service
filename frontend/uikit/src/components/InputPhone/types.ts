import { ColorsProps } from '@/components/InputText'


export interface InputPhoneProps extends ColorsProps{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  hintText?: string;
  defaultCountry?: 'ru' | 'us' | 'cn';
  className?: string;
  dataTestId?: string;
  isTable?: boolean;
}
