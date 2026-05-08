import { SxProps, Theme } from "@mui/material";
import { createUseStyles } from "@/hooks";
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useFont, useSpacing, useToken } from '@/theme'

const OPTION_HEIGHT = 36;

export interface ColorsProps {
  colors?: {
    borderColor?: {
      default: string;
      hover: string;
      focus: string;
    };
    chevron?: {
      default: string;
      hover: string;
    }
  }
}

export interface DropDownProps extends ColorsProps{
  open?: boolean;
  isDisable?: boolean;
  customOpener?: boolean;
  value?: boolean;
  error?: boolean;
  overflowOptionsCount?: number;
  isTable?: boolean;
}


export const useDropDownClasses = (props:DropDownProps) =>  {
  const baseStyles = useDropDownBaseStyles(props)

  return createUseStyles({
      input: {
          ...baseStyles.default,
          ...(props.isDisable ? {} : {
            "&:hover": {
              ...baseStyles.hover,
              "& .MuiIconButton-root": {
                "& path": {
                  stroke: useToken("dropdown_base/color/icon/hover")
                }
              }
            },
          }),
          "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
            ...baseStyles.focus,
            "& .MuiIconButton-root": {
              "& path": {
                stroke: useToken("dropdown_base/color/icon/focused")
              }
            },
            "& .MuiInputBase-input.MuiAutocomplete-input::placeholder":{
              opacity: 0,
            }
          },
          "&.Mui-error": {
            "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
              ...baseStyles.errorFocus
            },
          },
          "& fieldset": {
            border: "none",
          },
          "& .MuiInputBase-root": {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "100%",
            padding: "0 !important",
          },
          "& .MuiInputBase-input": {
            flex: "1",
            padding: "0 !important",
            ...baseStyles.input,
            "&::placeholder": {
              ...baseStyles.placeholder,
            },
          },
          "& .MuiAutocomplete-endAdornment": {
            position: "static",
            display: "flex",
            alignItems: "center",
            transform: "none",
            gap: useToken("dropdown_base/gap/name4"),
          },
          "& .MuiIconButton-root": {
            ...baseStyles.iconButton,
            transform: "none",
          },
          "& .MuiFormControl-root": {
            display: "flex",
            height: "100%",
          }
      },

      listItem: {
        padding: "8px 16px",
      },

      li: {
        ...baseStyles.listItem,
        "&[aria-selected='true']": {
          backgroundColor: `${useToken("dropdown_list_items/color/fill/default")} !important`,
          "&:hover": {
            backgroundColor: `${useToken("dropdown_list_items/color/fill/hovered")} !important`
          },
        },
        "& .MuiListItemText-root": {
          marginBlock: "0",
        },
        "& .MuiTypography-root": {
          fontSize: "inherit",
          lineHeight: "inherit",
          fontWeight: "inherit",
        },
        "& svg": {
          flexShrink: 0,
        },
      },
      paper: {
        ...baseStyles.paper,
        "& .MuiList-root": {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      popoverPaper: {
        maxWidth: "none",
        marginTop: "4px",
      },
      innerPopper: {
        position: "static !important",
        width: "100% !important",
        transform: "none !important",

        "& .MuiPaper-root": {
          backgroundColor: "transparent !important",
          borderRadius: "0 !important",
          boxShadow: "none !important",
        },
      },
      listBox: (props: {overflowOptionsCount: number}) => ({
        // по умолчанию 8 опций до появления скролла
        maxHeight: `${OPTION_HEIGHT * (props.overflowOptionsCount || 8)}px`,
        padding: "0",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        overflow: "auto",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }),
      textOverflow: {
        ...baseStyles.textOverflow,
      }
  })
}

export const useDropDownInlineStyles = (
  overflowOptionsCount?: number
): {
  [key: string]: SxProps<Theme>;
} => {
  const paper: SxProps<Theme> = {
    boxShadow: useBoxShadow([{
      x: "shadow/number/position/name0",
      y: "shadow/number/position/name12",
      blur: "shadow/number/blur/name16",
      spread: "shadow/number/spread/nameminus4",
      color: "shadow/color/black_8",
    }, {
      x: "shadow/number/position/name0",
      y: "shadow/number/position/name4",
      blur: "shadow/number/blur/name6",
      spread: "shadow/number/spread/nameminus2",
      color: "shadow/color/black_3",
    }]),
    border: useBorder({
      width: "dropdown_menu/width/name1",
      style: BorderStyle.SOLID,
      color: "dropdown_menu/color/stroke/default",
    }),
    borderRadius: useToken("dropdown_menu/corners/name5", TokenReturnType.PX),
    "& .MuiList-root": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  };

  const popoverPaper: SxProps<Theme> = {
    ...paper,
    maxWidth: "none",
    marginTop: "4px",
  };

  const innerPopper: SxProps<Theme> = {
    position: "static !important",
    width: "100% !important",
    transform: "none !important",

    "& .MuiPaper-root": {
      backgroundColor: "transparent !important",
      borderRadius: "0 !important",
      boxShadow: "none !important",
    },
  };

  const listbox: SxProps<Theme> = {
    // по умолчанию 8 опций до появления скролла
    maxHeight: `${OPTION_HEIGHT * (overflowOptionsCount || 8)}px`,
    padding: "0",
    msOverflowStyle: "none",
    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  return { paper, popoverPaper, listbox, innerPopper };
};

export const useDropDownBaseStyles = (props: DropDownProps) => {
  const { default: chevronDefault, hover: chevronHover } = props.colors?.chevron ?? {}
  const { default: borderDefault, focus: borderFocus, hover: borderHover } = props.colors?.borderColor ?? {}
  const isTable = props.isTable ? 'table/' : ''

  const getBackgroundColor = () => {
    switch (true) {
      case props.value && props.isDisable:
        return `dropdown_base/${isTable}color/fill/blocked`
      case props.value:
        return `dropdown_base/${isTable}color/fill/filled`
      case props.isDisable:
        return `dropdown_base/${isTable}color/fill/disabled`
      default:
        return `dropdown_base/${isTable}color/fill/default`
    }
  }

  const getBorderColor = () => {
    switch (true) {
      case props.error:
        return `dropdown_base/${isTable}color/stroke/error`
      case props.value && props.isDisable:
        return `dropdown_base/${isTable}color/stroke/blocked`
      case props.value:
        return `dropdown_base/${isTable}color/stroke/filled`
      case props.isDisable:
        return `dropdown_base/${isTable}color/stroke/disabled`
      default:
        return `dropdown_base/${isTable}color/stroke/default`
    }
  }

  const getIconColor = () => {
    switch (true) {
      case props.value && props.isDisable:
        return `dropdown_base/${isTable}color/icon/blocked`
      case props.value:
        return `dropdown_base/${isTable}color/icon/filled`
      case props.isDisable:
        return `dropdown_base/${isTable}color/icon/disabled`
      default:
        return `dropdown_base/${isTable}color/icon/default`
    }
  }

  return {
    default: {
      backgroundColor: useToken(getBackgroundColor()),
      borderRadius: useToken("dropdown_base/corners/name5", TokenReturnType.PX),
      border: useBorder({
        width: `dropdown_base/width/name1`,
        style: BorderStyle.SOLID,
        color: getBorderColor(),
      }),
      ...(borderDefault ? {
        borderColor: borderDefault
      } : {}),
      boxShadow: useBoxShadow({
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }),
      padding: useSpacing( isTable ? {
        top: 'dropdown_base/table/gap/name6',
        right: 'dropdown_base/table/gap/name6',
        bottom: 'dropdown_base/table/gap/name6',
        left: 'dropdown_base/table/gap/name8',
      } : !props.customOpener ? {
        vertical: 'dropdown_base/gap/name16',
        horizontal: 'dropdown_base/gap/name8',
      } : {
        vertical: 'search/gap/name12',
        horizontal: 'search/gap/name16',
      }),
      transitionProperty: "color, background, border-color, box-shadow",
      transitionDuration: "0.3s",
      width: "100%",
      height: isTable ? "32px" : "40px",
      ...(isTable ? {
        gap: useToken('dropdown_base/table/gap/name4'),
      }: {})
    },
    hover: {
      backgroundColor: useToken(`dropdown_base/${isTable}color/fill/hover`),
      borderColor: !props.error && (borderHover ? borderHover : useToken(`dropdown_base/${isTable}color/stroke/hover`)),
      "& .chevron": {
        "& path": {
          stroke: chevronHover ?? useToken("dropdown_base/color/icon/hover")
        }
      },
    },
    focus: {
      backgroundColor: useToken(`dropdown_base/${isTable}color/fill/focused`),
      borderColor: !props.error && (borderFocus ? borderFocus : useToken(`dropdown_base/${isTable}color/stroke/focused`)),
      boxShadow: useBoxShadow([
        props.isTable ? {
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name0",
        blur: "shadow/number/blur/name0",
        spread: "shadow/number/spread/name2",
        color: "shadow/color/blue_30",
      } : {
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
        color: "shadow/color/gray",
      }]),
    },
    errorFocus: {
      boxShadow: useBoxShadow([
        props.isTable ? {
          x: "shadow/number/position/name0",
          y: "shadow/number/position/name0",
          blur: "shadow/number/blur/name0",
          spread: "shadow/number/spread/name2",
          color: "shadow/color/red_20",
        } : {
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name0",
        blur: "shadow/number/blur/name0",
        spread: "shadow/number/spread/name4",
        color: "shadow/color/red_20",
      }, {
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name1",
        blur: "shadow/number/blur/name2",
        spread: "shadow/number/spread/name0",
        color: "shadow/color/gray",
      }]),
    },
    input: {
      color: useToken(props.value && props.isDisable ? "dropdown_base/color/text/placeholder/blocked" : "dropdown_base/color/text/placeholder/filled"),
      font: useFont({
        size: "typography/paragraph/p4/font_size",
        weight: "typography/paragraph/font_weight",
        family: "typography/font_family",
      }),
      lineHeight: useToken("typography/paragraph/p4/line_height", TokenReturnType.PX),
      letterSpacing: useToken("typography/paragraph/p4/letter_spacing", TokenReturnType.PX),
    },
    placeholder: {
      color: useToken(props.isDisable ? "dropdown_base/color/text/placeholder/disabled" : "dropdown_base/color/text/placeholder/default"),
      opacity: 1,
    },
    iconButton: {
      padding: "0",
      margin: "0",
      width: '16px',
      height: '16px',
      "& path": {
        transition: "stroke 0.3s",
        stroke: chevronDefault ?? useToken(getIconColor())
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    listItem: {
      minHeight: `${useToken("dropdown_list_items/size/width", TokenReturnType.PX)} !important`,
      padding:  `${useSpacing({
        right: 'dropdown_list_items/gap/name8',
        left: 'dropdown_list_items/gap/name16',
        top: 8,
        bottom: 8
      })} !important`,
      gap: useToken("dropdown_list_items/gap/name8"),
      font: useFont({
        size: "typography/paragraph/p3/font_size",
        weight: "typography/paragraph/p3/font_weight",
        family: "typography/font_family",
      }),
      lineHeight: useToken("typography/paragraph/p3/line_height", TokenReturnType.PX),
      letterSpacing: useToken("typography/paragraph/p3/letter_spacing", TokenReturnType.PX),
      color: useToken("dropdown_list_items/color/text/hover"),
      backgroundColor: useToken("dropdown_list_items/color/fill/default"),
      "&:hover": {
        backgroundColor: `${useToken("dropdown_list_items/color/fill/hovered")} !important`,
      },
    },
    paper: {
      boxShadow: useBoxShadow([{
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name12",
        blur: "shadow/number/blur/name16",
        spread: "shadow/number/spread/nameminus4",
        color: "shadow/color/black_8",
      }, {
        x: "shadow/number/position/name0",
        y: "shadow/number/position/name4",
        blur: "shadow/number/blur/name6",
        spread: "shadow/number/spread/nameminus2",
        color: "shadow/color/black_3",
      }]),
      border: useBorder({
        width: "dropdown_menu/width/name1",
        style: BorderStyle.SOLID,
        color: "dropdown_menu/color/stroke/default",
      }),
      borderRadius: useToken("dropdown_menu/corners/name5", TokenReturnType.PX),
    },
    badgeContainer: {
      position: "fixed",
      left: -9999,
      top: -9999,
      visibility: "hidden",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    },
    badgeBox: {
      display: "flex",
      gap: 0.5,
      alignItems: "center"
    },
    inputArea: {
      display: "flex",
      gap: useToken("dropdown_base/gap/name8"),
      flex: 1,
      overflow: "hidden",
    },
    textOverflow: {
      whiteSpace: 'nowrap',
      overflow: "hidden",
      textOverflow: "ellipsis",
    }
  }
}


