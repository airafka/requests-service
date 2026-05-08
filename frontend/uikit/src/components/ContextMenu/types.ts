import { MouseEventHandler, ReactNode } from "react";

export type ContextMenuItems = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}[];

export type ContextMenuProps = {
  contextMenuPosition: {
    top: number;
    left: number;
  } | null;
  handleClose: () => void;
  items: ContextMenuItems;
  closeOnClick?: boolean;
  isTable?: boolean;
};
