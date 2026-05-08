import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../hooks/createUseStyles";

export const useStyles = (top: number, right: number, theme: Theme) => {
  return createUseStyles({
    position: {
      position: "absolute",
      top: top + "px",
      right: right + "px",
      width: "24px",
      aspectRatio: "1",
    },
  });
};
