import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../../hooks/createUseStyles";

export const getStyles = (theme: Theme) => {
  return createUseStyles({
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      background: theme.colors.white,
      minWidth: "auto",
      padding: "3px",
      cursor: "pointer",
      border: "1px solid " + theme?.colors?.gray.superLightGray,
      color: theme.colors.primary.main,
      transitionProperty: "all",

      "&:hover": {
        border: "1px solid " + theme?.colors?.primary.main,
      },

      "&:focus": {
        border: "1px solid " + theme?.colors?.primary.main,
      },
    },

    buttonDisabled: {
      border: "1px solid " + theme.colors.gray.superLightGray,
      cursor: "default",
      color: theme.colors.gray.superLightGray,
      pointerEvents: "none",
    },
  });
};
