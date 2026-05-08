import { Theme } from "@mui/material";

export const useCalendarHeaderStyles = (theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    padding: "11px 14px",
    borderBottom: `1px solid ${theme.colors.gray.grayShadow_4}`,
  },
  text: {
    display: "flex",
    gap: "8px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "17px",
    textTransform: "capitalize",
    color: `${theme.colors.black.black20}`,
  },
  button: {
    cursor: "pointer",
  }
});
