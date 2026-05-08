declare module "@alabuga/uikit" {
  import type { MouseEvent, ReactNode } from "react";

  export function UikitProvider(props: {
    theme?: unknown;
    children: ReactNode;
  }): JSX.Element;

  export enum ButtonType {
    default,
    light,
    outlined,
    iconOutlined,
  }

  export function BaseButton(props: {
    buttonType?: ButtonType;
    isDisabled?: boolean;
    isLoad?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children?: ReactNode;
    ButtonAction?: "button" | "submit" | "reset";
    form?: string;
    fullWidth?: boolean;
    dataTestId?: string;
    allowTextWrap?: boolean;
  }): JSX.Element;

  export function PageCard(props: { children: ReactNode }): JSX.Element;

  export type SelectValue = number | string | undefined;
  export type SelectOptionsPrimitives = Array<string | number>;
  export type SelectOptions =
    | SelectOptionsPrimitives
    | Array<{ value: string | number | boolean; label: string }>;

  export function Select(props: {
    value?: SelectValue;
    options?: SelectOptions;
    onChange?: (value: SelectValue) => void;
    label?: string;
    placeholder?: string;
    error?: boolean;
    hintText?: string;
    withoutClearIcon?: boolean;
    className?: string;
  }): JSX.Element;

  export function SelectMulti(props: {
    value?: SelectOptionsPrimitives;
    options?: SelectOptions;
    onChange?: (value: SelectOptionsPrimitives) => void;
    label?: string;
    placeholder?: string;
    error?: boolean;
    hintText?: string;
    withoutClearIcon?: boolean;
    className?: string;
  }): JSX.Element;
}
