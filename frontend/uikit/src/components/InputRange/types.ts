export type InputRangeValue = {
  from?: number;
  to?: number;
};

export interface InputRangeProps {
  className?: string;
  value?: InputRangeValue;
  label?: string;
  hintText?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (val: InputRangeValue | undefined) => void;
  customOpener?: (props: {
    isOpen: boolean;
    onClick: () => void;
    setAnchorRef: (node: HTMLElement | null) => void;
  }) => React.ReactNode;
}
