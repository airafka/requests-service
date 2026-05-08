import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../hooks/createUseStyles";
import {
  useScrollbarStyles,
  SCROLLBAR_CUSTOM_TRACK_COLOR,
} from "../../hooks/useScrollbarStyles";

export const useStyles = createUseStyles((theme: Theme) => {
  const scrollbar = useScrollbarStyles(theme);

  const backgroundColor = theme.colors.primary.white;

  return {
    drawer: {
      ...scrollbar,
    },
    paper: {
      width: "750px",
      height: "100%",
      padding: "32px 16px 16px 16px",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
      backgroundColor,
      [SCROLLBAR_CUSTOM_TRACK_COLOR]: backgroundColor,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "50px",
    },
    title: {
      marginBottom: "16px",
      ...theme.typography.subtitle2,
    },
    closeIcon: {
      position: "absolute",
      top: "32px",
      right: "16px",
      padding: 0,
      minWidth: "24px",
      height: "24px",

      "& path": {
        stroke: `${theme.colors.iron} !important`,
      },
    },
  };
});
