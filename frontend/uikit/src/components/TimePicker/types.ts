import { PickerPositions } from "@/types";

export interface CustomTimePickerProps {
  value?: string | Date | null;
  onChange?: (time: Date | null) => void;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  position?: PickerPositions;
  label?: string;
  hintText?: string;
  className?: string;
  customOpener?: (props: {
    isOpen: boolean;
    onClick: () => void;
    setAnchorRef: (node: HTMLElement | null) => void;
  }) => React.ReactNode;
}
