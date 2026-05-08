import { Theme } from "@mui/material";
import { createUseStyles } from "../../../hooks/createUseStyles";
import {
  useToken,
  useBorder,
  useSpacing,
  BorderStyle,
  TokenReturnType,
} from "../../../theme/utils/useToken";
import { ToggleSize } from "./types";

export const useStyles = (
  theme: Theme,
  size: ToggleSize = ToggleSize.medium,
  checkAllowTextWrap: boolean,
) => {
  const getSizeStyles = () => {
    switch (size) {
      case ToggleSize.small:
        return {
          height: 36,
        };
      case ToggleSize.large:
        return {
          height: 56,
        };
      case ToggleSize.medium:
      default:
        return {
          height: 46,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return createUseStyles({
    toggleGroup: {
      backgroundColor: "#F2F4F7",
      borderRadius: 6,
      padding: "2px 2px",
      "& button": {
        color: "#4B4B51",
      },
    },

    toggleButton: {
      FontSize: 12,
      fontWeight: 500,
      backgroundColor: "transparent",
      color: useToken("button_text/outlined/color/text/default"),
      textTransform: "none",
      height: checkAllowTextWrap ? "auto" : sizeStyles.height,
      maxHeight: checkAllowTextWrap ? sizeStyles.height : "auto",
      minWidth: checkAllowTextWrap ? "auto" : "fit-content",
      border: "none",
      boxSizing: "border-box",

      "&:hover": {
        color: useToken("button_text/outlined/color/text/hovered"),
        backgroundColor: "transparent",
      },

      "&.Mui-selected": {
        backgroundColor: useToken("button_text/default/color/fill/default"),
        color: useToken("button_text/default/color/text/default"),
        borderRadius: 5,

        "&:hover": {
          backgroundColor: useToken("button_text/default/color/fill/hovered"),
          color: useToken("button_text/default/color/text/hovered"),
        },

        "&:focus": {
          backgroundColor: useToken("button_text/default/color/fill/focused"),
          color: useToken("button_text/default/color/text/focused"),
        },
      },

      "&:focus": {
        backgroundColor: useToken("button_text/outlined/color/fill/focused"),
        color: useToken("button_text/outlined/color/text/focused"),
      },

      "&.Mui-disabled": {
        backgroundColor: "transparent",
        color: useToken("button_text/default/color/text/disabled"),
        border: "none",
      },

      "& .MuiToggleButton-label": {
        display: "flex",
        alignItems: "center",
      },
    },

    toggleButtonWithWrap: {
      height: "auto",
      minWidth: "auto",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },

    buttonLabelWithWrap: {
      height: "auto",
      whiteSpace: "normal",
      wordBreak: "normal",
      lineHeight: 1.2,
    },

    fullWidth: {
      width: "100%",

      "& .MuiToggleButton-root": {
        flex: 1,
      },
    },
  });
};
