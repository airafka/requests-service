import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";
import { CommonSize } from "../Button/BaseButton";
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useToken } from "@/theme";
import { useBorderRadius } from "@/theme/utils";

const checkboxStyles = createUseStyles((theme: Theme) => ({
  checkbox: (props: { size: CommonSize, isDisabled: boolean, checked: boolean, error: boolean, indeterminate: boolean }) => {
    const sizeStr: Record<CommonSize, number> = {
      [CommonSize.Small]: 16,
      [CommonSize.Medium]: 20,
      [CommonSize.Large]: 24,
    };

    const bgColor = () => {
      switch (true) {
        case props.error:
          return useToken("checkbox/color/fill/error")
        case props.isDisabled:
          return useToken("checkbox/color/fill/disabled")
        case props.checked || props.indeterminate:
          return useToken("checkbox/color/fill/checked")
        default:
          return useToken("checkbox/color/fill/default")
      }
    }

    const iconColor = () => {
      switch (true) {
        case props.error:
          return useToken("checkbox/color/icon/error")
        case props.isDisabled:
          return useToken("checkbox/color/icon/disabled")
        default:
          return useToken("checkbox/color/icon/active")
      }
    }

    const borderColor = () => {
      switch (true) {
        case props.error:
          return "checkbox/color/stroke/error"
        case props.checked && !props.isDisabled || props.indeterminate && !props.isDisabled:
          return "checkbox/color/fill/checked"
        case props.isDisabled:
          return "checkbox/color/stroke/disabled"
        default:
          return "checkbox/color/stroke/default"
      }
    }

    const svgStrokeWidth = () => {
      switch (true) {
        case sizeStr[props.size] === 20:
          return props.indeterminate ? '2' : '1'
        case sizeStr[props.size] === 24:
          return '2'
        default:
          return '1'
      }
    }

    return {
      borderRadius: useToken("checkbox/corners/name2", TokenReturnType.PX),
      border: useBorder({
        width: sizeStr[props.size] === 24 ? "checkbox/corners/name2" : "checkbox/width/name1",
        style: BorderStyle.SOLID,
        color: `${borderColor()}`,
      }),
      backgroundColor: bgColor(),
      width: sizeStr[props.size],
      height: sizeStr[props.size],
      transition: "all 0.2s ease-in-out",
      color: iconColor(),

      "path": {
        strokeWidth: svgStrokeWidth()
      },

      ".MuiCheckbox-root:focus-visible &, .MuiCheckbox-root:hover &": {
        borderColor: useToken("checkbox/color/stroke/hovered"),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name2",
          color: "shadow/color/blue_50",
        }),
      },
    };
  },
  container: {
    padding: 0,
  },
}));

export default checkboxStyles;
