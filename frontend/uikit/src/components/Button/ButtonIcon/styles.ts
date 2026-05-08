import { Theme } from "@mui/material";
import { createUseStyles } from "../../../hooks/createUseStyles";
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useToken } from "../../../theme/utils/useToken";

export const useStyles = (theme: Theme) => {
  return createUseStyles({
    button: {
      borderRadius: useToken("button_icon/corners/name3", TokenReturnType.PX),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/white/color/stroke/default",
      }),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      padding: "4px",
      minWidth: 40,
      height: 40,
      "& .MuiButton-startIcon": {
        padding: 0,
        margin: 0,
      },
    },
    buttonRegular: {
      "& svg": {
        width: 24,
        height: 24,
      },
    },
    buttonSmall: {
      minWidth: 24,
      height: 24,
      padding: 0,
      borderRadius: useToken("button_icon/corners/name2", TokenReturnType.PX),
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    buttonColorDefault: {
      backgroundColor: useToken("button_icon/type/blue/color/fill/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      border: "none",
      "& svg": {
        color: useToken("button_icon/type/blue/color/icon/default"),
      },
      "& path": {
        stroke: useToken("button_icon/type/blue/color/icon/default"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/blue/color/fill/hovered"),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/blue/color/icon/hovered"),
        },
        "& path": {
          stroke: useToken("button_icon/type/blue/color/icon/hovered"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/blue/color/fill/focused"),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/blue/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/blue/color/icon/focused"),
        },
      },
    },
    buttonColorLight: {
      backgroundColor: useToken("button_icon/type/white/color/fill/default"),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/white/color/stroke/default",
      }),
      boxShadow: useBoxShadow([{
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }, {
        x: "shadow/number/position/name3",
        y: "shadow/number/position/name2",
        blur: "shadow/number/blur/name3",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray_50"
      }]),
      borderRadius: useToken("button_icon/corners/name2", TokenReturnType.PX),
      "& svg": {
        color: useToken("button_icon/type/white/color/icon/default"),
      },
      "& path": {
        stroke: useToken("button_icon/type/white/color/icon/default"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/white/color/fill/hovered"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/white/color/stroke/hovered",
        }),
        boxShadow: useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }, {
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50"
        }]),
        "& svg": {
          color: useToken("button_icon/type/white/color/icon/hovered"),
        },
        "& path": {
          stroke: useToken("button_icon/type/white/color/icon/hovered"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/white/color/fill/focused"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/white/color/stroke/focused",
        }),
        boxShadow: useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }, {
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name3",
          color: "shadow/color/blue_50"
        }]),
        "& svg": {
          color: useToken("button_icon/type/white/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/white/color/icon/focused"),
        },
      },
    },
    buttonDisabled: {
      backgroundColor: useToken("button_icon/type/blue/color/fill/disabled"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      border: "none",
      "& svg": {
        color: useToken("button_icon/type/blue/color/icon/disabled"),
      },
      "& path": {
        stroke: useToken("button_icon/type/blue/color/icon/disabled"),
      },
    },
    iconError: {
      backgroundColor: useToken("button_icon/type/red/color/fill/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/red/color/stroke/default",
      }),
      "& svg": {
        color: useToken("button_icon/type/red/color/icon/focused"),
      },
      "& path": {
        stroke: useToken("button_icon/type/red/color/icon/focused"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/red/color/fill/hovered"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/red/color/stroke/hovered",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/red/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/red/color/icon/focused"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/red/color/fill/focused"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/red/color/stroke/focused",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/red/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/red/color/icon/focused"),
        },
      },
    },
    iconSuccess: {
      backgroundColor: useToken("button_icon/type/green/color/fill/default"),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/green/color/stroke/default",
      }),
      "& svg": {
        color: useToken("button_icon/type/green/color/icon/default"),
      },
      "& path": {
        stroke: useToken("button_icon/type/green/color/icon/default"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/green/color/fill/hovered"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/green/color/stroke/hovered",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/green/color/icon/hovered"),
        },
        "& path": {
          stroke: useToken("button_icon/type/green/color/icon/hovered"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/green/color/fill/focused"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/green/color/stroke/focused",
        }),
        boxShadow: useBoxShadow({
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }),
        "& svg": {
          color: useToken("button_icon/type/green/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/green/color/icon/focused"),
        },
      },
    },
    iconGray: {
      backgroundColor: useToken("button_icon/type/gray/color/fill/default"),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/gray/color/stroke/default"
      }),
      borderRadius: useToken("button_icon/corners/name3"),
      boxShadow: useBoxShadow([{
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }, {
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50",
      }]),
      "& svg": {
        color: useToken("button_icon/type/gray/color/icon/default"),
      },
      "& path": {
        stroke: useToken("button_icon/type/gray/color/icon/default"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/gray/color/fill/hovered"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/gray/color/stroke/hovered"
        }),
        boxShadow: useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }, {
          x: "shadow/number/position/name3",
          y: "shadow/number/position/name2",
          blur: "shadow/number/blur/name3",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray_50",
        }]),
        "& svg": {
          color: useToken("button_icon/type/gray/color/icon/hovered"),
        },
        "& path": {
          stroke: useToken("button_icon/type/gray/color/icon/hovered"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/gray/color/fill/focused"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/gray/color/stroke/focused"
        }),
        "& svg": {
          color: useToken("button_icon/type/gray/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/gray/color/icon/focused"),
        },
        boxShadow: useBoxShadow([{
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name1",
          blur: "shadow/number/blur/name2",
          spread: "shadow/number/spread/name0",
          color: "shadow/color/gray",
        }, {
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name3",
          color: "shadow/color/gray_25",
        }]),
      }
    },
    closeButton: {
      backgroundColor: useToken("button_icon/type/white/color/fill/default"),
      border: useBorder({
        width: "button_icon/width/name1",
        style: BorderStyle.SOLID,
        color: "button_icon/type/gray/color/stroke/default",
      }),
      "& svg": {
        color: useToken("button_icon/type/gray/color/icon/default"),
      },
      "& path": {
        stroke: useToken("button_icon/type/gray/color/icon/default"),
      },
      "&:hover": {
        backgroundColor: useToken("button_icon/type/gray/color/fill/hovered"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/gray/color/stroke/hovered",
        }),
        "& svg": {
          color: useToken("button_icon/type/gray/color/icon/hovered"),
        },
        "& path": {
          stroke: useToken("button_icon/type/gray/color/icon/hovered"),
        },
      },
      "&:focus": {
        backgroundColor: useToken("button_icon/type/gray/color/fill/focused"),
        border: useBorder({
          width: "button_icon/width/name1",
          style: BorderStyle.SOLID,
          color: "button_icon/type/gray/color/stroke/focused",
        }),
        "& svg": {
          color: useToken("button_icon/type/gray/color/icon/focused"),
        },
        "& path": {
          stroke: useToken("button_icon/type/gray/color/icon/focused"),
        },
      },
    },
  });
};
