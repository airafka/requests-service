import { MouseEventHandler, useState } from "react";
import { ContextMenuItems } from "./types";

export const useContextMenu = () => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [contextMenuItems, setContextMenuItems] = useState<ContextMenuItems>(
    []
  );
  const [contextMenuRowId, setContextMenuRowId] = useState<string>();

  const handleContextMenu = <T extends HTMLElement>(
    event: Parameters<MouseEventHandler<T>>[0],
    rowId?: string
  ) => {
    event.preventDefault();
    setContextMenuPosition((prev) => {
      if (!prev) {
        return {
          left: event.clientX + 2,
          top: event.clientY + 5,
        };
      }
      return null;
    });
    rowId && setContextMenuRowId(rowId);
    return (newContextMenuItems: ContextMenuItems) =>
      setContextMenuItems(newContextMenuItems);
  };

  const handleContextMenuClose = () => {
    setContextMenuPosition(null);
  };

  return {
    contextMenuItems,
    contextMenuRowId,
    contextMenuPosition,
    handleContextMenu,
    handleContextMenuClose,
  };
};
