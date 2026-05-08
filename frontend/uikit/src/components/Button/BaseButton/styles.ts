import { Theme } from "@mui/material";
import { createUseStyles } from "../../../hooks/createUseStyles";
import {
  useToken,
  useBorder,
  useSpacing,
  useFont,
  useBoxShadow,
  BorderStyle,
  TokenReturnType,
} from "../../../theme/utils/useToken";

export const useStyles = (theme: Theme, allowTextWrap: boolean = false) => {
  return createUseStyles({
    button: {
      font: useFont({
        size: "typography/paragraph/p3/font_size",
        weight: "typography/paragraph/p3/font_weight",
        family: "typography/font_family",
      }),
      borderRadius: useToken("button_text/corners/name3", TokenReturnType.PX),
      backgroundColor: useToken("button_text/default/color/fill/default"),
      color: useToken("button_text/default/color/text/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name3",
        y: "shadow/number/position/name2",
        blur: "shadow/number/blur/name3",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray_50",
      }),
      padding: useSpacing({
        horizontal: "button_text/gap/name16",
        vertical: "button_text/gap/name6",
      }),
      gap: useToken("button_text/gap/name4", TokenReturnType.PX),
      height: allowTextWrap ? "auto" : 28,
      minHeight: allowTextWrap ? 28 : undefined,
      maxWidth: allowTextWrap ? "93px" : undefined,
      display: "flex",
      textTransform: "none",
      boxSizing: "border-box",

      "&:hover": {
        color: useToken("button_text/default/color/text/hovered"),
        backgroundColor: useToken("button_text/default/color/fill/hovered"),
        boxShadow: useBoxShadow([
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name3",
            blur: "shadow/number/blur/name2",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/blue_80",
            inset: true,
          },
          {
            x: "shadow/number/position/nameminus3",
            y: "shadow/number/position/nameminus3",
            blur: "shadow/number/blur/name2",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/blue_80",
            inset: true,
          },
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name2",
            blur: "shadow/number/blur/name3",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/gray_50",
          },
        ]),
      },

      "&:focus": {
        color: useToken("button_text/default/color/text/focused"),
        backgroundColor: useToken("button_text/default/color/fill/focused"),
        boxShadow: useBoxShadow([
          {
            x: "shadow/number/position/nameminus3",
            y: "shadow/number/position/nameminus3",
            blur: "shadow/number/blur/name2",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/blue_50",
            inset: true,
          },
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name3",
            blur: "shadow/number/blur/name2",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/blue_50",
            inset: true,
          },
          {
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name0",
            blur: "shadow/number/blur/name0",
            spread: "shadow/number/spread/name3",
            color: "shadow/color/blue_30",
          },
        ]),
      },
      "&:disabled": {
        background: useToken("button_text/default/color/fill/disabled"),
        color: useToken("button_text/default/color/text/disabled"),
        boxShadow: "none",
      },
      "&.MuiButton-loading": {
        color: "transparent",
      },
      "&.MuiButton-loading .MuiButton-startIcon": {
        opacity: 0,
      },
      "& .MuiButton-startIcon": {
        marginRight: 0,
        marginLeft: 0,
      },
    },
    buttonText: {
      height: allowTextWrap ? undefined : "17px",
      lineHeight: "17px",
      display: "inline-block",
      whiteSpace: allowTextWrap ? "normal" : undefined,
      wordBreak: allowTextWrap ? "normal" : undefined,
    },
    light: {
      backgroundColor: useToken("button_text/outlined/color/fill/default"),
      border: useBorder({
        width: "button_text/width/name1",
        style: BorderStyle.SOLID,
        color: "button_text/outlined/color/stroke/default",
      }),
      color: useToken("button_text/outlined/color/text/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name3",
        y: "shadow/number/position/name2",
        blur: "shadow/number/blur/name3",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray_50",
      }),
      "&:hover": {
        backgroundColor: useToken("button_text/outlined/color/fill/hovered"),
        color: useToken("button_text/outlined/color/text/hovered"),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "button_text/outlined/color/stroke/hovered",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50",
        }),
      },
      "&:focus": {
        backgroundColor: useToken("button_text/outlined/color/fill/focused"),
        color: useToken("button_text/outlined/color/text/focused"),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "button_text/outlined/color/stroke/focused",
        }),
        boxShadow: useBoxShadow([
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name2",
            blur: "shadow/number/blur/name3",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/gray_50",
          },
          {
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name0",
            blur: "shadow/number/blur/name0",
            spread: "shadow/number/spread/name3",
            color: "shadow/color/blue_30",
          },
        ]),
      },
    },
    iconOutlined: {
      backgroundColor: useToken("button_text/icon_outlined/color/fill/default"),
      border: useBorder({
        width: "button_text/width/name1",
        style: BorderStyle.SOLID,
        color: "button_text/icon_outlined/color/stroke/default",
      }),
      color: useToken("button_text/icon_outlined/color/text/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name3",
        y: "shadow/number/position/name2",
        blur: "shadow/number/blur/name3",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray_50",
      }),
      "& svg": {
        color: useToken("icon/color/primary_1"),
        "& path": {
          stroke: useToken("icon/color/primary_1"),
        },
      },
      "&:hover": {
        backgroundColor: useToken(
          "button_text/icon_outlined/color/fill/hovered",
        ),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "button_text/icon_outlined/color/stroke/hovered",
        }),
        color: useToken("button_text/icon_outlined/color/text/hovered"),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50",
        }),
        "& svg": {
          color: useToken("icon/color/primary_1"),
          "& path": {
            stroke: useToken("icon/color/primary_1"),
          },
        },
      },
      "&:focus": {
        backgroundColor: useToken(
          "button_text/icon_outlined/color/fill/focused",
        ),
        color: useToken("button_text/icon_outlined/color/text/focused"),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "button_text/icon_outlined/color/stroke/focused",
        }),
        boxShadow: useBoxShadow([
          {
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name0",
            blur: "shadow/number/blur/name0",
            spread: "shadow/number/spread/name3",
            color: "shadow/color/blue_30",
          },
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name2",
            blur: "shadow/number/blur/name3",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/gray_50",
          },
        ]),
        "& svg": {
          color: useToken("icon/color/primary_1"),
          "& path": {
            stroke: useToken("icon/color/primary_1"),
          },
        },
      },
      "&:disabled": {
        "& svg": {
          color: useToken("button_text/default/color/text/disabled"),
          "& path": {
            stroke: useToken("button_text/default/color/text/disabled"),
          },
        },
      },
    },
    outlined: {
      backgroundColor: useToken("button_text/outlined/color/fill/default"),
      color: useToken("button_text/outlined/color/text/default"),
      border: useBorder({
        width: "button_text/width/name1",
        style: BorderStyle.SOLID,
        color: "primitives/blue/700",
      }),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name3",
        y: "shadow/number/position/name2",
        blur: "shadow/number/blur/name3",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray_50",
      }),
      "&:hover": {
        backgroundColor: useToken("button_text/outlined/color/fill/default"),
        color: useToken("button_text/outlined/color/text/default"),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "primitives/blue/800",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50",
        }),
      },
      "&:focus": {
        backgroundColor: useToken("button_text/outlined/color/fill/default"),
        color: useToken("button_text/outlined/color/text/default"),
        border: useBorder({
          width: "button_text/width/name1",
          style: BorderStyle.SOLID,
          color: "primitives/blue/700",
        }),
        boxShadow: useBoxShadow([
          {
            x: "shadow/number/position/name3",
            y: "shadow/number/position/name2",
            blur: "shadow/number/blur/name3",
            spread: "shadow/number/spread/name0",
            color: "shadow/color/gray_50",
          },
          {
            x: "shadow/number/position/name0",
            y: "shadow/number/position/name0",
            blur: "shadow/number/blur/name0",
            spread: "shadow/number/spread/name3",
            color: "shadow/color/blue_30",
          },
        ]),
      },
    },
    sizeLarge: {
      height: "40px",
      padding: "12px 16px",
      borderRadius: "4px",
      font: useFont({
        size: "typography/paragraph/p2/font_size",
        weight: "typography/paragraph/p2/font_weight",
        family: "typography/font_family",
        lineHeight: "typography/paragraph/p2/line_height",
      }),
    },
    sizeRegular: {
      height: "28px",
    },
    tertiary: {
      color: "#9CA3B1",
      boxShadow: "none",
      border: "none",
      padding: "6px 4px",
      backgroundColor: "transparent",
      "& svg": {
        width: 18,
        height: 18,
        "& path": {
          fill: "#9CA3B1",
          stroke: "none",
        },
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: "#191A1F",
        border: "none",
        boxShadow: "none",
        "& svg": {
          "& path": {
            fill: "#191A1F",
            stroke: "none",
          },
        },
      },
      "&:focus": {
        backgroundColor: "transparent",
        color: "#191A1F",
        border: "none",
        boxShadow: "none",
        "& svg": {
          "& path": {
            fill: "#191A1F",
            stroke: "none",
          },
        },
      },
    },
  });
};
