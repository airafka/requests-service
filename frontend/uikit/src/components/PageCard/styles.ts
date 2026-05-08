import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../hooks/createUseStyles";

export const useStyles = (theme: Theme) => {
  return createUseStyles({
    card: {
      height: "100%",
      overflow: "auto",
      padding: "8px 16px",
      background: theme.colors.white,
      borderRadius: 5,
    },
  });
};
