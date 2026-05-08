import type { Dispatch, SetStateAction } from "react";

export interface TreeSelectNodeBase {
  id: string;
  code?: string;
  name?: string;
  children?: TreeSelectNodeBase[];
}

export type TreeSelectGetId<T> = (node: T) => string;
export type TreeSelectGetLabel<T> = (node: T) => string;
export type TreeSelectGetChildren<T> = (node: T) => T[] | undefined;

export interface TreeSelectProps<T extends TreeSelectNodeBase> {
  options: T[];

  selectedValue: T | null;
  onChange?: (value: T | null) => void;

  inputValue: string;
  handleInput?: (newValue: string) => void;

  placeholder?: string;
  label?: string;
  hintText?: string;

  error?: boolean;
  isDisable?: boolean;
  isLoading?: boolean;

  withoutClearIcon?: boolean;

  fieldName?: string;
  dataTestId?: string;

  getOptionId?: TreeSelectGetId<T>;
  getOptionLabel?: TreeSelectGetLabel<T>;
  getOptionChildren?: TreeSelectGetChildren<T>;
}

export type ExpandedIdsState = {
  expandedIds: string[];
  setExpandedIds: Dispatch<SetStateAction<string[]>>;
};
