import {
  Box,
  useTheme,
} from "@mui/material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers";
import { DatePickerArrowsGroup } from "../../UI/DatePickerArrow";
import { useCalendarHeaderStyles } from "./useCalendarHeaderStyles";
import { SetStateAction } from "react";

interface CalendarHeaderProps extends PickersCalendarHeaderProps<Date> {
  currentView: "day" | "month" | "year";
  monthPanelYear: number;
  setMonthPanelYear: (year: number) => void;
  yearsRange: {
    min: Date;
    max: Date;
  }
  setYearsRange: React.Dispatch<SetStateAction<{min: Date, max: Date}>>
  setViewMonthDate: React.Dispatch<SetStateAction<Date>>
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const { currentMonth, onViewChange, currentView, monthPanelYear, setMonthPanelYear } = props;
  const theme = useTheme();
  const styles = useCalendarHeaderStyles(theme);

  if (currentView === "month" && monthPanelYear !== currentMonth.getFullYear()) {
    setMonthPanelYear(currentMonth.getFullYear());
  }

  return (
    <Box sx={styles.root}>
      <DatePickerArrowsGroup {...props} to="right" currentView={currentView} />

      <Box sx={styles.text}>
        {currentView === "year" ? (
          `1900-2099`
        ) : currentView === "month" ? (
          currentMonth.getFullYear()
        ) : (
          <>
            <Box
              sx={styles.button}
              onClick={() => onViewChange && onViewChange("month")}
            >
              {currentMonth.toLocaleString("ru", { month: "long" })}
            </Box>

            <Box
              sx={styles.button}
              onClick={() => onViewChange && onViewChange("year")}
            >
              {currentMonth.getFullYear()}
            </Box>
          </>
        )}
      </Box>

      <DatePickerArrowsGroup {...props} to="left" currentView={currentView} />
    </Box>
  );
};
