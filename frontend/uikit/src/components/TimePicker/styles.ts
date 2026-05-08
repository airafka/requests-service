import {
  type Theme,
} from "@mui/material";
import { createUseStyles, useSuperLightBorderStyles } from "@/hooks";

interface StyleProps {
  theme: Theme;
  value?: boolean;
  fullWidth: boolean;
  disabled?: boolean;
  error?: boolean;
}

export const useTimePickerStyles = createUseStyles((theme: Theme) => {
  const superLightBorderStyles = useSuperLightBorderStyles(theme);

  return {
    wrapper: ({ error, value }: StyleProps) => ({
      width: "100%",
      height: "40px",
      "& .MuiInputBase-root": {
        ...superLightBorderStyles.default,
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        height: "100%",
        padding: 0,
        "&:hover": {
          ...superLightBorderStyles.hover,
          borderColor: theme.colors.primary.main,
          "& .MuiIconButton-root": {
            color: superLightBorderStyles.hover.borderColor,
          },
        },
        "&.Mui-focused": {
          ...superLightBorderStyles.focus,
          boxShadow: `0px 0px 0px 4px ${theme.colors.secondary.light20}, 0px 1px 2px 0px ${theme.colors.black.black10}`,
          borderColor: theme.colors.primary.main,
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
          }
        }),
        "&.Mui-disabled": {
          ...superLightBorderStyles.disabled,
          color: theme.colors.gray.lightGrey,
        },
        "& .MuiInputBase-input": {
          height: "100%",
          padding: "0 8px",
          fontSize: "14px",
          color: "inherit",
          cursor: "pointer",
          fontFamily: theme.typography.fontFamily || "sans-serif",
          "&::placeholder": {
            color: theme.colors.gray.lightGrey,
            opacity: 1,
          },
          "&.Mui-disabled": {
            "WebkitTextFillColor": "currentColor",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      },
      "& .MuiInputAdornment-root": {
        maxHeight: "100%",
        margin: "0",
      },
      "& .MuiIconButton-root": {
        color: error ? `${theme.colors.error} !important` :
            value ? theme.colors.primary.main : theme.colors.iron,
        height: "100%",
        padding: "8px",
        marginRight: "0",
        transition: "color 0.3s",
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
        }
      },
    }),
    popper: {
      borderRadius: "2px",
      "& .MuiPaper-root": {
        borderRadius: "2px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.3), 0 8px 24px 0 rgba(0, 0, 0, 0.08)',
      },
      "& .MuiMultiSectionDigitalClock-root": {
        maxWidth: "max-content",
      },
      "& .MuiMultiSectionDigitalClockSection-root": {
        padding: '8px 12px',
        width: '62px',
        "&:after": {
          display: 'none',
        },
        "&:not(:first-of-type)": {
          borderLeft: "none",
        },
      },
      "& .MuiList-root": {
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      "& .MuiMultiSectionDigitalClockSection-item": {
        padding: "6px 10px",
        margin: "0",
        fontSize: "14px",
        height: "28px",
        width: "38px",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: theme.colors.gray.superLightGray,
        },
        "&:focus, &:focus-visible": {
          backgroundColor: theme.colors.primary.main,
          color: theme.colors.primary.white,
        },
      },
      "& .MuiPickersLayout-root": {
        display: "block",
      },
      "& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected.MuiMultiSectionDigitalClockSection-item": {
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.white,
      },
    },
    footer: {
      backgroundColor: "transparent",
      height: "37px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 14px",
      boxShadow: 'none !important',
    },
    nowButton: {
      color: theme.colors.primary.main,
      backgroundColor: "transparent",
      "&:hover": {
        border: "none",
        backgroundColor: "transparent",
      },
      border: "none",
      minWidth: "auto",
      padding: "0",
      fontSize: "14px",
      fontFamily: theme.typography.fontFamily || "sans-serif",
      textTransform: "none",
    },
    okButton: {
      backgroundColor: theme.colors.primary.main,
      borderRadius: "2px",
      color: theme.colors.primary.contrastText,
      minWidth: "37px",
      maxWidth: "37px",
      width: "37px",
      height: "26px",
      padding: "0",
      margin: "0",
      fontFamily: theme.typography.fontFamily || "sans-serif",
      "&:hover": {
        backgroundColor: theme.colors.primary.dark,
      },
      textTransform: "none",
    },
    iconInactive: {
      color: theme.colors.iron,
    },
    iconActive: {
      color: theme.colors.primary.main,
    },
    header: {
      textAlign: "center",
      padding: "11.5px 39.5px",
      borderBottom: `1px solid ${theme.colors.gray.grayShadow_4}`,
      fontFamily: theme.typography.fontFamily,
      fontSize: "14px",
      lineHeight: "17px",
    },
  }
})
