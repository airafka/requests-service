import { Theme } from "@mui/material";

interface FooterStyles {
    theme: Theme;
    borderNone: boolean;
}

export const useFooterStyles = ({theme, borderNone}: FooterStyles) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "36px",
    width: "100%",
    padding: "10px 12px",
    borderTop: borderNone ? 'none'  : `1px solid ${theme.colors.gray.grayShadow_4}`,

    "& .MuiButtonBase-root": {
      color: `${theme.colors.primary.main} !important`,
      border: "1px solid transparent",
      height: "24px",
      minWidth: 0,
      padding: "2px 8px",
      borderRadius: "2px",
      lineHeight: "22px",
      boxShadow: "none !important",
      fontWeight: "400",
      fontSize: "14px",
      "&:hover": {
        color: `${theme.colors.white} !important`,
      },
    },
  },
});
