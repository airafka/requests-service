import type { CSSProperties } from "react";

export interface ValueOptionMulti {
    value: string | number;
    label: string;
}

export interface AutocompleteMultiProps {
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
    className?: string;
    onSelectAll?: (isAllSelected: boolean) => void | Promise<void>;
}
