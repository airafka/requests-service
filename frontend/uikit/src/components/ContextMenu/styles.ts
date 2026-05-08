import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";
import {
  SCROLLBAR_CUSTOM_TRACK_COLOR,
  useScrollbarStyles,
} from "../../hooks/useScrollbarStyles";

export const useMenuStyles = createUseStyles((theme: Theme) => {
  const scrollBarStyles = useScrollbarStyles(theme);

  return {
    paper: ({ isTable }: { isTable?: boolean }) => ({
      backgroundColor: theme.colors.primary.white,
      padding: isTable ? "16px" : 0,
      boxShadow: `0px 12px 16px -4px ${theme.colors.gray.grayShadow_1}, 0px 4px 6px -2px ${theme.colors.gray.grayShadow_2}`,
      border: `1px solid ${theme.colors.gray.superLightGray}`,
      borderRadius: "8px",
      width: isTable ? "224px" : "240px",
      maxHeight: isTable ? "447px" : "360px",
      ...scrollBarStyles,
      [SCROLLBAR_CUSTOM_TRACK_COLOR]: theme.colors.primary.white,
    }),
    list: ({ isTable }: { isTable?: boolean }) => ({
      padding: 0,
      ...(isTable
        ? {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }
        : {}),
    }),
    listItem: ({ isTable }: { isTable?: boolean }) => ({
      minHeight: "32px",
      display: "flex",
      alignItems: "center",
      "&:not(:last-child)": {
        borderBottom: isTable
          ? "none"
          : `1px solid ${theme.colors.primary[50]}`,
      },
      "&:hover, &:focus": {
        backgroundColor: isTable ? "transparent" : theme.mainBackgroundColor,
      },
    }),
    listItemChildrenIsReactNode: {
      padding: "0 !important",
    },
    listItemLabel: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      width: "100%",
      height: "100%",
      padding: "4px 0 4px 16px",
      fontSize: "14px",
      color: theme.colors.black.black20,
    },
  };
});
