import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../../../hooks/createUseStyles";

export const useStyles = createUseStyles((theme: Theme) => {
  return {
    title: {
      display: "flex",
      alignItems: "center",
      minHeight: "24px",
      marginBottom: "16px",
      ...theme.typography.subtitle1,
    },
  };
});
