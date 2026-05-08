import { Theme } from "@mui/material";
import { createUseStyles } from "@/hooks";
import { useSuperLightBorderStyles } from "@/hooks";
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useFont, useToken } from "@/theme";
import { getIconStartColor } from "./helpers";
import { ColorsProps, IconStartBehavior } from "./types";

interface StyleProps extends ColorsProps{
  hasValue?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  iconStartBehavior?: IconStartBehavior;
  theme: Theme,
  isTable?: boolean;
}

export const useInputTextStyles = (props: StyleProps) => {
  const superLightBorderStyles = useSuperLightBorderStyles(props.theme);
  const { default: borderDefault, hover, focus} = props.borderColor ?? {}

  return createUseStyles({
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: useToken("input/corners/name5"),
      border: useBorder({
        width: "input/stroke/name1",
        style: BorderStyle.SOLID,
        color: props.isTable ? "input/table/color/stroke/default" : props.hasValue ? "input/color/stroke/filled" : "input/color/stroke/default",
      }),
    },
    inputField: {
      ...superLightBorderStyles.default,
      background: props.hasValue ? useToken("input/color/fill/filled") : useToken("input/color/fill/default"),
      ...(borderDefault ? {
        borderColor: borderDefault
      } : {}),
      borderRadius: useToken("input/corners/name5", TokenReturnType.PX),
      color: useToken("input/color/text/placeholder/filled"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      font: useFont({
        size: "typography/paragraph/p4/font_size",
        weight: "typography/paragraph/p4/font_weight",
        family: "typography/font_family",
      }),
      width: "100%",
      height: props.isTable ? "32px" : "40px",
      paddingLeft: "var(--if-padding-left, 8px)",
      paddingRight: "var(--if-padding-right, 32px)",
      display: "flex",
      alignItems: "center",
      "&::placeholder": {
        color: useToken("input/color/text/placeholder/default"),
        opacity: 1,
      },
      "&:hover": {
        background: useToken("input/color/fill/hovered"),
        border: useBorder({
          width: "input/stroke/name1",
          style: BorderStyle.SOLID,
          color: "input/color/stroke/hovered",
        }),
        ...(hover ? {
          borderColor: hover,
        } : {}),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/black_10",
        }),
        "&::placeholder": {
          color: useToken("input/color/text/placeholder/hovered"),
        },
      },
      "&:focus": {
        outline: "none",
        background: useToken("input/color/fill/focused"),
        border: useBorder({
          width: "input/stroke/name1",
          style: BorderStyle.SOLID,
          color: "input/color/stroke/focused",
        }),
        ...(focus ? {
          borderColor: focus,
        } : {}),
        boxShadow: useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name4",
          color: "shadow/color/blue_30_2",
        }, {
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/black_10",
        }]),
        "&::placeholder": {
          opacity: 0,
        },
      },
      "&:disabled": {
        pointerEvents: "none",
        background: useToken("input/color/fill/disabled"),
        color: useToken("input/color/text/placeholder/disabled"),
        border: useBorder({
          width: "input/stroke/name1",
          style: BorderStyle.SOLID,
          color: "input/color/stroke/disabled",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "&::placeholder": {
          color: useToken("input/color/text/placeholder/disabled"),
        },
      },
      ...(props.isInvalid && !props.isDisabled
        ? {
            borderColor: useToken("input/color/stroke/error"),
            "&:hover": {
              borderColor: useToken("input/color/stroke/error"),
            },
            "&:focus": {
              borderColor: useToken("input/color/stroke/error"),
              boxShadow: useBoxShadow([{
                x: "shadow/number/position/name0",
                y: "shadow/number/position/name0",
                blur: "shadow/number/blur/name0",
                spread: "shadow/number/spread/name4",
                color: "shadow/color/red_20",
              },{
                x: "shadow/number/position/name0",
                y: "shadow/number/position/name1",
                blur: "shadow/number/blur/name2",
                spread: "shadow/number/spread/name0",
                color: "shadow/color/gray",
              }]),
              "&::placeholder": {
                opacity: 0,
              },
              outline: "none",
            },
          }
        : {}),
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        margin: 0,
        "-webkit-appearance": "none",
      },
      "&[type=number]": {
        "-moz-appearance": "textfield",
      },
    },
    inputFieldWithIconStart: {
      "--if-padding-left": "37px",
    },
    inputFieldWithIconEnd: {
      "--if-padding-right": "32px",
    },
    icon: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "16px",
      height: "16px",
      pointerEvents: "none",
      "& svg": {
        width: "100%",
        height: "100%",
        "& path": {
          stroke: props.theme.colors.gray.grayIron,
          transition: "stroke 0.3s",
        },
      },
    },
    iconStart: ({ hasValue, isDisabled, isInvalid, iconStartBehavior = "dynamic" }: StyleProps) => ({ 
      left: "8px",
      "& svg path": {
        ...(iconStartBehavior === "static" 
          ? { stroke: "none" } 
          : {
              stroke: getIconStartColor({
                isDisabled: !!isDisabled,
                hasValue: !!hasValue,
                isInvalid: !!isInvalid,
              }),
            }
        ),
      },
    }),
    iconEnd: ({ hasValue, isDisabled }: StyleProps) => ({
      right: "9px",
      "& svg path": {
        stroke: isDisabled
          ? hasValue
            ? props.theme.colors.gray.grayIron
            : props.theme.colors.gray.lightGrey
          : hasValue
            ? props.theme.colors.primary.main
            : props.theme.colors.gray.grayIron,
      },
    }),
  })
}
