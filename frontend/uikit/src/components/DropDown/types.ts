import { PickerPositions } from "@/types";

export enum DropDownChangeReason {
  INPUT = "input",
  RESET = "reset",
  CLEAR = "clear",
  SELECT_OPTION = "selectOption",
  BLUR = "blur",
}

export interface DropdownProps {
  children: React.ReactNode;
  position?: PickerPositions;
  withContentWrapper?: boolean;
  opener?: (props: {
    isOpen: boolean;
    onOpen: () => void;
    setAnchorRef: (node: HTMLElement | null) => void;
  }) => React.ReactNode;
}
