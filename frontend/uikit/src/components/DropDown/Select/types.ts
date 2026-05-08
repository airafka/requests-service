import { colorBadge } from "@/components/Badge";
import { ColorsProps } from '@/components/DropDown/styles'

export interface ValueOption {
  value: string | number | boolean;
  label: string;
}
export interface ValueOptionMulti {
  value: string | number;
  label: string;
}

export type SelectOptionsPrimitives = ValueOptionMulti["value"][];
export type SelectOptions = SelectOptionsPrimitives | ValueOption[];
export type SelectValue = number | string | undefined;
export type SelectBoolValue = boolean | undefined;

export interface SelectProps extends ColorsProps{
  isDisable?: boolean;
  menuPlacement?: "top" | "bottom";
  options?: SelectOptions;
  value?: SelectValue;
  onChange?: (value: SelectValue | undefined) => void;
  translatePath?: string;
  translate?: (value: SelectValue) => string;
  fieldName?: string;
  error?: boolean;
  dataTestId?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  hintText?: string;
  withoutClearIcon?: boolean;
  withBadge?: boolean;
  withOptionsBadges?: boolean;
  hideSelectedIconInList?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
  customOpener?: (props: {
    isOpen: boolean;
    setAnchorRef: (node: HTMLElement | null) => void;
    onClick: () => void;
  }) => React.ReactNode;
  isTable?: boolean;
}

export interface SelectBoolProps extends ColorsProps{
  placeholder?: string;
  isDisable?: boolean;
  value?: SelectBoolValue;
  onChange?: (value: SelectBoolValue) => void;
  error?: boolean;
  className?: string;
  fieldName?: string;
  label?: string;
  hintText?: string;
  customOpener?: (props: {
    isOpen: boolean;
    setAnchorRef: (node: HTMLElement | null) => void;
    onClick: () => void;
  }) => React.ReactNode;
  withoutClearIcon?: boolean;
  dataTestId?: string;
  isTable?: boolean;
}
export interface SelectMultiProps extends ColorsProps{
  value?: SelectOptionsPrimitives;
  onChange?: (value: SelectOptionsPrimitives) => void;
  isDisable?: SelectProps["isDisable"];
  options?: SelectProps["options"];
  translatePath?: SelectProps["translatePath"];
  translate?: SelectProps["translate"];
  fieldName?: SelectProps["fieldName"];
  error?: SelectProps["error"];
  withoutClearIcon?: SelectProps["withoutClearIcon"];
  dataTestId?: SelectProps["dataTestId"];
  placeholder?: SelectProps["placeholder"];
  isFilter?: boolean;
  label?: string;
  hintText?: string;
  className?: string;
  withOptionsBadges?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
  selectAllLabel?: string;
  customOpener?: (props: {
    isOpen: boolean;
    setAnchorRef: (node: HTMLElement | null) => void;
    onClick: () => void;
  }) => React.ReactNode;
  isTable?: boolean;
}
