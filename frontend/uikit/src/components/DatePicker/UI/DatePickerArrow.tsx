import { FC, SetStateAction } from "react";
import { Box } from "@mui/material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers";

import {
  ArrowEmptyIcon,
  ArrowEmptyDoubleIcon,
} from "@/icons";
import { startOfMonth } from "date-fns";

export interface DatePickerArrowGroupProps extends PickersCalendarHeaderProps<Date> {
  to: "left" | "right";
  currentView: "day" | "month" | "year";
  yearsRange: {
      min: Date;
      max: Date;
    }
  setYearsRange: React.Dispatch<SetStateAction<{min: Date, max: Date}>>
  setViewMonthDate: React.Dispatch<SetStateAction<Date>>
}

export interface DatePickerArrowProps extends DatePickerArrowGroupProps {
  isDouble: boolean;
}

export const DatePickerArrow: FC<DatePickerArrowProps> = (props) => {
  const { currentMonth, onMonthChange, isDouble, to, setViewMonthDate } = props;
  const iconsStyles = {
    transform: to === "left" ? "rotate(180deg)" : "rotate(0deg)",
  };
  setViewMonthDate(currentMonth)

  return (
    <button
      onClick={() => {
        const prevMonth = new Date(currentMonth);
        if (isDouble) {
          prevMonth.setFullYear(prevMonth.getFullYear() + (to === "left" ? 1 : -1));
        } else {
          prevMonth.setMonth(prevMonth.getMonth() + (to === "left" ? 1 : -1));
        }
        onMonthChange(prevMonth, to);
      }}
      style={{
        fontSize: 18,
        background: "none",
        border: "none",
        padding: '0',
        cursor: 'pointer',
      }}
    >
      {isDouble ? (
        <ArrowEmptyDoubleIcon style={iconsStyles} />
      ) : (
        <ArrowEmptyIcon style={iconsStyles} />
      )}
    </button>
  );
};

export const DatePickerArrowsGroup: FC<DatePickerArrowGroupProps> = (props) => {
  return (
    <Box display="flex" sx={{gap: '0 10px'}}>
      {props.currentView === "day" ? (
        <>
          <DatePickerArrow {...props} isDouble={props.to === "right"} />
          <DatePickerArrow {...props} isDouble={props.to === "left"} />
        </>
      ) : props.currentView === "month" || props.currentView === 'year' ? (
        <DatePickerArrow {...props} isDouble={true} />
      ) : null}
    </Box>
  );
};
