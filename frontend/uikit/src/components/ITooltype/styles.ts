import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";
import {
  useBoxShadow,
  useFont,
  useToken,
  useBorderRadius,
} from "../../theme/utils/useToken";

export const useStyles = createUseStyles((theme: Theme) => ({
  box: {
    margin: "3px 0",
    background: useToken("tooltip/color/fill/default"),
    padding: useToken("tooltip/gap/name8"),
    color: useToken("tooltip/color/text/default"),
    boxShadow: useBoxShadow({
      x: "shadow/number/position/name2",
      y: "shadow/number/position/name2",
      blur: "shadow/number/blur/name4",
      spread: "shadow/number/spread/name0",
      color: "shadow/color/gray_70",
    }),
    maxWidth: "500px",
  },
  font: {
    font: useFont({
      weight: useToken("typography/paragraph/p6/font_weight"),
      size: useToken("typography/paragraph/p6/font_size"),
    }),
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  tooltipTopLeft: {
    borderRadius: useBorderRadius({
      topLeft: "tooltip/corners/name0",
      topRight: "tooltip/corners/name3",
      bottomRight: "tooltip/corners/name3",
      bottomLeft: "tooltip/corners/name3",
    }),
  },
  tooltipBottomLeft: {
    borderRadius: useBorderRadius({
      topLeft: "tooltip/corners/name3",
      topRight: "tooltip/corners/name3",
      bottomRight: "tooltip/corners/name3",
      bottomLeft: "tooltip/corners/name0",
    }),
  },
  tooltipBottomRight: {
    borderRadius: useBorderRadius({
      topLeft: "tooltip/corners/name3",
      topRight: "tooltip/corners/name3",
      bottomRight: "tooltip/corners/name0",
      bottomLeft: "tooltip/corners/name3",
    }),
  },
  tooltipTopRight: {
    borderRadius: useBorderRadius({
      topLeft: "tooltip/corners/name3",
      topRight: "tooltip/corners/name0",
      bottomRight: "tooltip/corners/name3",
      bottomLeft: "tooltip/corners/name3",
    }),
  },
}));

export const useIconStyles = createUseStyles((theme: Theme) => {
  return {
    icon: {
      width: "16px",
      height: "16px",
      color: theme?.colors?.gray?.grayIron,
      transition: "all 0.2s ease",
      "&:hover": {
        color: theme?.colors?.primary?.main,
      },
    },
  };
});
