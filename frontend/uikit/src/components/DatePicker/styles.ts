import { Theme } from "@mui/material";

import { CommonSize } from "@/types";
import { createUseStyles, useSuperLightBorderStyles } from "@/hooks";
import { BorderStyle, useBorder, useToken } from '@/theme'

interface StyleProps {
  fullWidth?: boolean;
  value?: boolean;
  theme: Theme;
  error?: boolean;
  hasCustomLayout?: boolean;
  hasInputReplacer?: boolean;
  // для DateRangePicker
  open?: boolean;
  disabled?: boolean;
  isTable?: boolean;
}

export const FONT_SIZE = {
  [CommonSize.Small]: "14px",
  [CommonSize.Medium]: "16px",
  [CommonSize.Large]: "18px",
};


export const useDatePickerStyles = createUseStyles((theme: Theme) => {
  const superLightBorderStyles = useSuperLightBorderStyles(theme)

  return {
    wrapper: ({disabled, error, hasInputReplacer, value = false, open, isTable }: StyleProps) => ({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: isTable ? "32px" : "40px",
      borderRadius: useToken("data_picker/corners/name5"),
      ...(isTable && {
        border: useBorder({
          width: "data_picker/stroke/name1",
          style: BorderStyle.SOLID,
          color: "data_picker/table/color/stroke/default"
        })
      }),
      // для DateRangePicker
      "&:not(.MuiTextField-root)": {
        ...superLightBorderStyles.default,
        gap: "8px",
        padding: "0 8px",
        cursor: "pointer",
        "&:hover": {
          ...superLightBorderStyles.hover,
        },
        ...(open && {
          ...superLightBorderStyles.focus,
        }),
        ...(error && {
          ...superLightBorderStyles.error,
          "&:hover": {
            ...superLightBorderStyles.errorHover,
          },
          ...(open && {
            ...superLightBorderStyles.errorFocus,
          }),
        }),
        ...(disabled && {
          ...superLightBorderStyles.disabled,
          color: theme.colors.gray.lightGrey,
        }),
      },
      "& .MuiInputBase-root": {
        ...superLightBorderStyles.default,
        // для позиционирования псевдоэлемента кнопки
        // для расширения области нажатия
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        color: theme.colors.black.black20,
        cursor: "pointer",
        padding: 0,
        pointerEvents: "none",
        "&:hover": {
          ...superLightBorderStyles.hover,
          "& .MuiIconButton-root": {
            color: superLightBorderStyles.hover.borderColor,
          },
        },
        "&.Mui-focused": {
          ...superLightBorderStyles.focus,
          "& .MuiIconButton-root": {
            color: superLightBorderStyles.focus.borderColor,
          },
        },
        ...(error && {
          ...superLightBorderStyles.error,
          "&:hover": {
            ...superLightBorderStyles.errorHover,
          },
          "&.Mui-focused": {
            ...superLightBorderStyles.errorFocus,
          },
        }),
        "&.Mui-disabled": {
          ...superLightBorderStyles.disabled,
          color: theme.colors.gray.lightGrey,
        },
        "& .MuiInputBase-input": {
          width: hasInputReplacer ? "0" : "100%",
          height: "100%",
          padding: "0 8px",
          paddingRight: "0",
          fontFamily: "inherit",
          fontSize: "14px",
          color: "inherit",
          "&::placeholder": {
            color: theme.colors.gray.lightGrey,
            opacity: 1,
          },
          "&.Mui-disabled": {
            WebkitTextFillColor: "currentColor",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      },
      "& .MuiInputAdornment-root": {
        maxHeight: "100%",
        margin: "0",
        marginLeft: "auto",
      },
      "& .MuiIconButton-root": {
        position: "static",
        height: "100%",
        padding: "8px",
        marginRight: "0",
        color: error
            ? `${theme.colors.error} !important`
            : value
                ? theme.colors.primary.main
                : theme.colors.gray.grayIron,
        transition: "color 0.3s",
        pointerEvents: "auto",
        "&::before": {
          content: "''",
          position: "absolute",
          inset: "0",
        },
        "& svg": {
          width: "16px",
          height: "16px",
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&.Mui-disabled": {
          color: `${theme.colors.gray.lightGrey} !important`,
        },
        "& .MuiTouchRipple-root": {
          display: "none",
        },
      },
    }),
    valueOutput: ({value}:StyleProps) => ({
      whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: value ? "inherit" : theme.colors.gray.lightGrey,
    }),
    inputPostfix: ({value}:StyleProps)  => ({
      width: '100%',
      fontSize: "14px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: value ? "inherit" : theme.colors.gray.lightGrey,
    }),
    rangeControls: ({disabled, error}:StyleProps)  => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexShrink: "0",
      "& svg": {
        flexShrink: "0",
        width: "16px",
        height: "16px",
        "& path": {
          stroke: theme.colors.gray.grayIron,
          ...(disabled && {
            stroke: theme.colors.gray.lightGrey,
          }),
        },
        "&.chevronIcon": {
          rotate: open ? "180deg" : "0deg",

          "& path": {
            ...(error &&
                !disabled && {
                  stroke: theme.colors.error,
                }),
          },
        },
      },
    }),
   popper: ({hasCustomLayout }:StyleProps) => ({
    "& .MuiPaper-root": {
      width: hasCustomLayout ? "fit-content" : "280px",
      height: "304px",
      border: `1px solid ${theme.colors.gray.superLightGray}`,
      borderRadius: "5px",
      boxShadow:
          "0px 4px 6px 0px #00000008, 0px 12px 6px 0px #00000014 !important",
    },

    "& .MuiPickersLayout-root": {
      display: "flex",
      flexDirection: "column",
    },

    "& .MuiDateCalendar-root": {
      width: "280px",
      height: "auto",
    },

    "& .MuiDateCalendar-viewTransitionContainer": {
      padding: "8px 12px",
    },

    "& .MuiPickersSlideTransition-root": {
      height: "180px",
      minHeight: "180px",
    },

    "& .MuiButtonBase-root, & .MuiPickersMonth-monthButton, & .MuiPickersYear-yearButton":
        {
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "17px",
          letterSpacing: "0",
          color: theme.colors.black.black20,
          borderRadius: "2px",
          transitionProperty: "color, background-color",
          transitionDuration: "0.3s",
          "&:focus": {
            backgroundColor: "transparent",
          },
          "&:hover": {
            color: theme.colors.white,
            backgroundColor: theme.colors.primary.main,
          },
          "&.Mui-selected": {
            fontWeight: "inherit",
            color: theme.colors.white,
            backgroundColor: theme.colors.primary.main,
            "&:hover": {
              color: theme.colors.white,
              backgroundColor: theme?.colors.primary.main,
            },
            "&:focus": {
              color: theme.colors.white,
              backgroundColor: theme.colors.primary.main,
            },
          },
          "&.MuiPickersDay-today": {
            borderColor: theme.colors.primary.main,
          },
          "& .MuiTouchRipple-root": {
            display: "none",
          },
        },

    "& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer": {
      alignItems: "center",
      justifyContent: "space-around",
      margin: "0",
    },

    '& .MuiDayCalendar-header': {
      margin: '6.5px 0 9.5px 0'
    },

    "& .MuiDayCalendar-monthContainer": {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },

    "& .MuiDayCalendar-weekDayLabel": {
      flexShrink: "0",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "17px",
      height: '17px',
      width: '19px',
      letterSpacing: "0",
      textTransform: "capitalize",
      color: theme.colors.black.black20,
    },

    "& .MuiPickersDay-root": {
      width: "24px",
      height: "24px",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "17px",
      letterSpacing: "0",
      "&.MuiPickersDay-dayOutsideMonth": {
        color: theme.colors.fossil,
        "&:hover": {
          color: theme.colors.white,
        },
        "&:focus": {
          color: theme.colors.white,
        },
      },
    },

    "& .MuiMonthCalendar-root, & .MuiYearCalendar-root": {
      width: "100%",
      height: "248px",
      gap: '40px 24px',
      overflowX: "hidden",
      overflowY: "auto",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      padding: '20px 14px 11px 14px',
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },

    "& .MuiPickersMonth-root, & .MuiPickersYear-root": {
      flexBasis: "0",
      height: '24px',
    },

    "& .MuiPickersMonth-monthButton, & .MuiPickersYear-yearButton": {
      width: "60px",
      height: "24px",
      margin: "0",
      textTransform: "capitalize",
    },
    "& .Mui-disabled": {
      color: theme.colors.fossil,
    }
  })
  }
})
