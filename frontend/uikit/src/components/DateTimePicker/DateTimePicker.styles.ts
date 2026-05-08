import { type Theme } from "@mui/material";
import { createUseStyles } from "@/hooks";

interface StyleProps {
  isExactTime?: boolean;
}

export const useDateTimePickerStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100%",
    backgroundColor: theme.surfaceColor,
    boxShadow: "0px 4px 6px 0px #00000008, 0px 12px 6px 0px #00000014",
  },
  container: ({isExactTime}:StyleProps) => ({
    display: "flex",
    flexDirection: "column",
    width: isExactTime ? '124px' : "390px",
    height: "100%",
    borderLeft: `1px solid ${theme.colors.gray.superLightGray}`,
  }),

  header: ({isExactTime}:StyleProps) =>  ({
    textAlign: isExactTime ? "center" : "left",
    height: "40px",
    padding: isExactTime ? "11.5px 39.5px" : "11px 12px",
    fontWeight: "400",
    fontSize: "14px",
    color: theme.colors.black.black20,
    borderBottom: `1px solid ${theme.colors.gray.grayShadow_4}`,
  }),
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  groupLabel: {
    margin: "0",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1",
    color: theme.colors.fossil,
  },
  groupIntervals: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  intervalButton: {
    minWidth: "80px",
    padding: "2px 8px",
    height: "22px",
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    color: theme.colors.black.black20,
    backgroundColor: theme.colors.gray.superLightGray,
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transitionDuration: "0.3s",
    transitionProperty: "color, background-color",
    "&:hover": {
      color: theme.surfaceColor,
      backgroundColor: theme.colors.primary.main,
    },
  },
  intervalButton_isChosen: {
    color: theme.surfaceColor,
    backgroundColor: `${theme.colors.primary.main} !important`,
    pointerEvents: "none",
  },
  footer: {
    backgroundColor: "transparent",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
    borderTop: `1px solid ${theme.colors.gray.grayShadow_4}`,
  },
  nowButton: {
    color: `${theme.colors.primary.main} !important`,
    backgroundColor: "transparent",
    "&:hover": {
      border: "none",
      backgroundColor: "transparent !important",
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
    color: `${theme.colors.primary.contrastText} !important`,
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
  timeIntervalsPicker: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "8px 12px",
    minHeight: "228.96px",
    maxHeight: "228.96px",
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  timePicker: {
    minHeight: "228.96px",
    overflow: "hidden",
    "& .MuiMultiSectionDigitalClock-root": {
    },
    "& .MuiMultiSectionDigitalClockSection-root": {
      padding: "8px 12px",
      width: '62px',
      "&:after": {
          display: "none",
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
    "& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected.MuiMultiSectionDigitalClockSection-item": {
      backgroundColor: theme.colors.primary.main,
      color: theme.colors.primary.white,
    },
  }
}));
