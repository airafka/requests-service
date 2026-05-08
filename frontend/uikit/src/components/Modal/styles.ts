import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import {
  useScrollbarStyles,
  SCROLLBAR_CUSTOM_TRACK_COLOR,
} from "../../hooks/useScrollbarStyles";
import { createUseStyles } from "../../hooks/createUseStyles";

interface StyleProps {
  height?: string | number;
  width?: string | number;
  padding?: string | number;
}

export const useStyles = createUseStyles((theme: Theme) => {
  const scrollbar = useScrollbarStyles(theme);

  const backgroundColor = theme.colors.primary.white;

  return {
    wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: (props: StyleProps) => props.width || "820px",
      height: (props: StyleProps) => props.height || "812px",
      maxHeight: "86vh",
      overflow: "hidden",
      backgroundColor,
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      "&:focus-visible": {
        outline: "none",
      },
    },
    content: {
      ...scrollbar,
      [SCROLLBAR_CUSTOM_TRACK_COLOR]: backgroundColor,
      display: "flex",
      flexDirection: "column",
      padding: (props: StyleProps) => props.padding || "16px",
      overflowY: "auto",
      flex: 1,
    },
    footer: {
      padding: "0 16px 16px 16px",
    },
  };
});
