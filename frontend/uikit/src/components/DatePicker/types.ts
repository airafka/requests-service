import { Theme } from "@mui/material";
import { PickersLayoutProps, DateView } from "@mui/x-date-pickers";

import { PickerPositions } from "@/types";

export interface CustomDatePickerProps {
  value?: string | null;
  onChange?: (date: Date | null) => void;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  position?: PickerPositions;
  error?: boolean;
  label?: string;
  hintText?: string;
  customLayout?: React.JSXElementConstructor<
    PickersLayoutProps<Date | null, Date, DateView>
  >;
  open?: boolean;
  className?: string;
  inputReplacer?: string;
  placeholder?: string;
  fieldName?: string;
  customOpener?: (props: {
    isOpen: boolean;
    onClick: () => void;
    setAnchorRef: (node: HTMLElement | null) => void;
  }) => React.ReactNode;
  shouldDisableToday?: boolean;
  isTable?: boolean;
}

export type DatePickerRangeS = {
  start?: string | null;
  end?: string | null;
};
export type DatePickerRange = DatePickerRangeS | undefined;
export type DatePickerRangeDate = {
  start?: Date | null;
  end?: Date | null;
} | null;
export interface CustomDateRangePickerProps {
  value?: DatePickerRange;
  onChange?: (date: DatePickerRange) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
  position?: PickerPositions;
  error?: boolean;
  placeholder?: string;
  label?: string;
  hintText?: string;
  className?: string;
  fieldName?: string;
  customOpener?: (props: {
    isOpen: boolean;
    onClick: () => void;
    setAnchorRef: (node: HTMLElement | null) => void;
  }) => React.ReactNode;
}

export interface StyleProps {
  theme: Theme;
  position?: PickerPositions;
}