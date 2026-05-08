import { DrawerProps as MuiDrawerProps } from "@mui/material";
import { ModalFooterButtonsProps } from "../Modal";

export interface DrawerProps extends MuiDrawerProps {
  onClose: () => void;
  cssClasses?: string;
  footerButtons?: ModalFooterButtonsProps[];
  dataTestId?: string;
}
