import classNames from "classnames";
import { Menu, MenuItem, useTheme } from "@mui/material";
import { ContextMenuProps } from "./types";
import { useMenuStyles } from "./styles";

export const ContextMenu = ({
  contextMenuPosition,
  handleClose,
  items,
  closeOnClick,
  isTable = false,
}: ContextMenuProps) => {
  const theme = useTheme();
  const classes = useMenuStyles({ theme, isTable });

  return (
    <Menu
      open={contextMenuPosition !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={contextMenuPosition || undefined}
      disableAutoFocusItem
      classes={{
        paper: classes.paper,
        list: classes.list,
      }}
    >
      {items.map(({ children, onClick }, index) => (
        <MenuItem
          key={index}
          onClick={(e) => {
            onClick?.(e);
            closeOnClick && handleClose();
          }}
          className={classNames(classes.listItem, classes.listItemLabel, {
            [classes.listItemChildrenIsReactNode]: typeof children !== "string",
          })}
        >
          {children}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ContextMenu;
