import { CommonSize } from "../Button/BaseButton";

export interface ICheckBoxProps {
  id?: string;
  checked?: boolean;
  onClick?: (params: {
    checked: boolean;
    event: React.ChangeEvent<HTMLInputElement>;
  }) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (checked: boolean) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  size?: CommonSize;
  className?: string;
  fullLine?: boolean;
  dataTestId?: string;
  error?: boolean;
  indeterminate?: boolean;
}
