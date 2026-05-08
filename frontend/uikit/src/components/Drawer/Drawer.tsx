import { FunctionComponent } from "react";
import classNames from "classnames";
import { Drawer as MuiDrawer, useTheme } from "@mui/material";
import { CloseButton } from "../CloseButton";
import { useStyles } from "./styles";
import { ModalFooter } from "../Modal";
import { DrawerProps } from "./types";

export const Drawer: FunctionComponent<DrawerProps> = ({
  onClose: onCloseOuter,
  className,
  cssClasses,
  children,
  footerButtons,
  dataTestId,
  ...rest
}) => {
  const classes = useStyles();
  const onClose = () => onCloseOuter?.();

  return (
    <MuiDrawer
      {...rest}
      onClose={onClose}
      className={classNames(classes.drawer, className)}
      classes={{ paper: classNames(classes.paper, cssClasses) }}
      anchor="right"
      data-test-id={dataTestId ?? "drawer"}
    >
      <CloseButton onClick={onClose} top={32} right={16} />
      {children}
      {footerButtons && <ModalFooter footerButtons={footerButtons} />}
    </MuiDrawer>
  );
};
