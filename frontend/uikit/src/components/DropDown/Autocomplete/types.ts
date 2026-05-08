import type { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";
import type { AutocompleteRenderInputParams } from "@mui/material";
import { colorBadge } from "@/components/Badge";
import { ColorsProps } from '@/components/DropDown/styles'

interface IdOnly {
  id: string | null;
}
interface IdCode extends IdOnly {
  code: string;
}
interface IdNonNullabelCodeNullable {
  id: NonNullable<IdCode["id"]>;
  code?: IdCode["code"];
}

export interface ValueOptionMulti {
  value: string | number;
  label: string;
}

export interface AutocompleteProps<T extends IdNonNullabelCodeNullable> extends ColorsProps{
  options: T[];
  placeholder?: string;
  selectedValue: T | null;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  onChange?: <T extends IdNonNullabelCodeNullable>(value: T | null) => void;
  onClear?: () => void;
  translatePath?: string;
  renderValuePrimary?: string;
  renderValueSecondary?: string;
  defaultNullValue?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
  error?: boolean;
  inputValue: string;
  handleInput?: (newValue: string) => void;
  handleItemLoad?: (element: HTMLElement | null) => void;
  handleListLoad?: (element: HTMLElement) => void;
  style?: CSSProperties;
  fieldName?: string;
  dataTestId?: string;
  useRenderValuePattern?: boolean;
  isLoading?: boolean;
  isDisable?: boolean;
  disablePortal?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  label?: string;
  hintText?: string;
  customOpener?: (props: {
    isOpen: boolean;
    setAnchorRef: (node: HTMLElement | null) => void;
    onClick: () => void;
  }) => React.ReactNode;
  overflowOptionsCount?: number;
  withOptionsBadges?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
  withoutClearIcon?: boolean;
  isTable?: boolean;
}

export interface AutocompleteMultiPropsDepr<
  T extends IdNonNullabelCodeNullable,
> {
  options: AutocompleteProps<T>["options"];
  inputValue: AutocompleteProps<T>["inputValue"];
  placeholder?: AutocompleteProps<T>["placeholder"];
  selectedValue: T[] | null;
  setSelectedValue: Dispatch<SetStateAction<T[] | null>>;
  onChange?: (value: T[] | null) => void;
  onClear?: AutocompleteProps<T>["onClear"];
  translatePath?: AutocompleteProps<T>["translatePath"];
  renderValuePrimary?: AutocompleteProps<T>["renderValuePrimary"];
  renderValueSecondary?: AutocompleteProps<T>["renderValueSecondary"];
  defaultNullValue?: AutocompleteProps<T>["defaultNullValue"];
  handleInput?: AutocompleteProps<T>["handleInput"];
  renderInput?: AutocompleteProps<T>["renderInput"];
  error?: AutocompleteProps<T>["error"];
  handleItemLoad?: AutocompleteProps<T>["handleItemLoad"];
  handleListLoad?: AutocompleteProps<T>["handleListLoad"];
  style?: AutocompleteProps<T>["style"];
  fieldName?: AutocompleteProps<T>["fieldName"];
  dataTestId?: AutocompleteProps<T>["dataTestId"];
  useRenderValuePattern?: AutocompleteProps<T>["useRenderValuePattern"];
  isLoading?: AutocompleteProps<T>["isLoading"];
  isDisable?: AutocompleteProps<T>["isDisable"];
  disablePortal?: AutocompleteProps<T>["disablePortal"];
  viewSelectedValueList?: boolean;
  tagRender?: boolean;
  label?: string;
  hintText?: string;
}

export interface AutocompleteMultiProps extends ColorsProps{
  options: ValueOptionMulti[];
  placeholder?: string;
  value: ValueOptionMulti[];
  onChange?: (value: ValueOptionMulti[]) => void;
  onClose?: () => void;
  translatePath?: string;
  error?: boolean;
  style?: CSSProperties;
  isLoading?: boolean;
  isDisable?: boolean;
  isFilter?: boolean;
  inputValue?: string;
  handleInput?: (newValue: string) => void;
  handleItemLoad?: (element: HTMLElement | null) => void;
  handleListLoad?: (element: HTMLElement) => void;
  label?: string;
  hintText?: string;
  dataTestId?: string;
  className?: string;
  showPickedOptions?: boolean;
  fieldName?: string;
  customOpener?: (props: {
    isOpen: boolean;
    setAnchorRef: (node: HTMLElement | null) => void;
    onClick: () => void;
  }) => React.ReactNode;
  overflowOptionsCount?: number;
  withOptionsBadges?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
  hasSearch?: boolean;
  withoutClearIcon?: boolean;
  isTable?: boolean;
}
