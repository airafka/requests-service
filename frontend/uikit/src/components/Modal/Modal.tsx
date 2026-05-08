import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@mui/material";
import { useStyles } from "./styles";
import { CloseButton } from "../CloseButton";
import {
  ModalFooter,
  ModalFooterButtonsProps,
} from "./ModalFooter/ModalFooter";

export interface ModalProps extends MuiModalProps {
  onClose: () => void;
  height?: string | number;
  width?: string | number;
  padding?: string | number;
  footerButtons?: ModalFooterButtonsProps[];
}

export const Modal = ({
  children,
  onClose,
  height,
  width,
  padding,
  footerButtons,
  ...rest
}: ModalProps) => {
  const classes = useStyles({ height, width, padding });
  return (
    <MuiModal {...rest} disableEscapeKeyDown={false} onClose={onClose}>
      <Box className={classes.wrapper}>
        <CloseButton onClick={onClose} top={16} right={16} />
        <Box className={classes.content}>{children}</Box>
        {footerButtons && (
          <Box className={classes.footer}>
            <ModalFooter footerButtons={footerButtons} />
          </Box>
        )}
      </Box>
    </MuiModal>
  );
};
