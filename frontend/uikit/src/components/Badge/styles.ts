import { Theme } from "@mui/material";
import { createUseStyles } from "@/hooks/createUseStyles";
import { useToken, TokenReturnType } from "@/theme";

interface StyleProps {
  maxWidth?: number;
  hasDot?: boolean;
  hasDelete?: boolean;
}

export const useStyles = createUseStyles((theme: Theme) => {
  return {
    badge: ({ maxWidth, hasDot = false, hasDelete = false }: StyleProps) => {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: !hasDot && !hasDelete ? "center" : hasDot && !hasDelete ? "center" : "flex-start",
        position: "relative",
        width: "fit-content",
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        height: "24px",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "18px",
        color: `var(--badge-color, ${theme?.colors?.black?.black20})`,
        backgroundColor: `var(--badge-bg, ${theme.colors.gray.superLightGray})`,
        padding: "3px 8px",
        borderRadius: useToken("badge/corners/name5", TokenReturnType.PX),

        "& .MuiChip-label": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: hasDot || hasDelete ? "32px" : "44px",
          height: "100%",
          maxWidth: "100%",
          padding: 0,
        },
        "& .MuiChip-icon": {
          display: "flex",
          alignItems: "center",
          color: `var(--dot-color, ${theme.colors.fossil}) !important`,
          marginRight: "6px",
          marginLeft: 0,
        },
        "& .MuiChip-deleteIcon": {
          color: `var(--badge-color, ${theme?.colors?.black?.black20}) !important`,
          position: "static",
          marginLeft: "4px",
          marginRight: 0,
          marginTop: 0,
          marginBottom: 0,
        },
        "&:hover": {
          backgroundColor: `var(--badge-bg, ${theme.colors.gray.superLightGray})`,
        },
      };
    },
    badgeGray: {
      "--badge-bg": useToken("badge/color/fill/gray"),
      "--badge-color": useToken("badge/color/text/gray"),
      "--dot-color": useToken("badge/color/icon/gray"),
    },
    badgePurple: {
      "--badge-bg": useToken("badge/color/fill/primary"),
      "--badge-color": useToken("badge/color/text/primary"),
      "--dot-color": useToken("badge/color/icon/primary"),
    },
    badgeRed: {
      "--badge-bg": useToken("badge/color/fill/error"),
      "--badge-color": useToken("badge/color/text/error"),
      "--dot-color": useToken("badge/color/icon/error"),
    },
    badgeYellow: {
      "--badge-bg": useToken("badge/color/fill/warning"),
      "--badge-color": useToken("badge/color/text/warning"),
      "--dot-color": useToken("badge/color/icon/warning"),
    },
    badgeGreen: {
      "--badge-bg": useToken("badge/color/fill/success"),
      "--badge-color": useToken("badge/color/text/success"),
      "--dot-color": useToken("badge/color/icon/success"),
    },
    badgeBlue: {
      "--badge-bg": useToken("badge/color/fill/blue"),
      "--badge-color": useToken("badge/color/text/blue"),
      "--dot-color": useToken("badge/color/icon/blue"),
    },
    badgeLightGreen: {
      "--badge-bg": useToken("badge/color/fill/green2"),
      "--badge-color": useToken("badge/color/text/green2"),
      "--dot-color": useToken("badge/color/icon/success2"),
    },
    badgeLightPurple: {
      "--badge-bg": useToken("badge/color/fill/purpleblue"),
      "--badge-color": useToken("badge/color/text/purpleblue"),
      "--dot-color": useToken("badge/color/icon/primary"),
    },
    badgeLightYellow: {
      "--badge-bg": useToken("badge/color/fill/greenyellow"),
      "--badge-color": useToken("badge/color/text/greenyellow"),
      "--dot-color": useToken("badge/color/icon/warning"),
    },
    badgeLightRed: {
      "--badge-bg": useToken("badge/color/fill/red"),
      "--badge-color": useToken("badge/color/text/red"),
      "--dot-color": useToken("badge/color/icon/error"),
    },
    badgeSoftGreen: {
      "--badge-bg": useToken("badge/color/fill/green"),
      "--badge-color": useToken("badge/color/text/green"),
      "--dot-color": useToken("badge/color/icon/success"),
    },
    badgeDarkGray: {
      "--badge-bg": useToken("badge/color/fill/filter"),
      "--badge-color": useToken("badge/color/text/filter"),
      "--dot-color": useToken("badge/color/text/filter"),
    },
    badgeLoading: {
      width: "60px",
      minWidth: "60px",
      "--badge-bg": useToken("skeleton/color/skeleton"),
      "--badge-color": useToken("skeleton/color/skeleton"),
      "--dot-color": useToken("skeleton/color/skeleton"),
      pointerEvents: "none",
    },
    dot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: `var(--dot-color, ${theme.colors.fossil})`,
    },
    text: {
      "&:not(:last-child)": {
        marginRight: "4px",
      },
    },
    closeIcon: {
      fontSize: "18px",
    },
    xIcon: {
      flexShrink: "0",
      width: "16px",
      height: "16px",
      color: `var(--badge-color, ${theme?.colors?.black?.black20})`,
    },
  };
});
