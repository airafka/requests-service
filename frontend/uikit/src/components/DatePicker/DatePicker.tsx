import { useState, forwardRef, useRef, useEffect } from "react";
import { ru } from "date-fns/locale";
import { Box, IconButton, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerPositions } from "@/types";
import { useDatePickerStyles } from "./styles";
import { CustomDatePickerProps } from "./types";
import { DATE_FORMAT } from "./format";
import { CalendarHeader } from "./components/CalendarHeader/CalendarHeader";
import { Footer } from "./components/Footer/Footer";
import { parseDDMMYYYY } from "./utils/parseDDMMYYYY";
import { DateIcon, TimeIcon } from "@/icons";
import { FieldWrapper } from "@/lib";
import { formatDate } from "@/helpers";
import { endOfMonth, endOfYear, isBefore, startOfDay, subDays, subYears } from "date-fns";

const CustomDatePicker = forwardRef<HTMLInputElement, CustomDatePickerProps>(
  (
    {
      value = null,
      onChange,
      onOpen,
      onClose,
      disabled = false,
      fullWidth,
      position = PickerPositions.BOTTOM_END,
      error = false,
      label,
      hintText,
      customLayout,
      open,
      className,
      inputReplacer,
      fieldName,
      customOpener,
      placeholder,
      isTable,
      shouldDisableToday
    },
    ref
  ) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    let normalizedValue: string | null = null;
    if (
      typeof value === "object" &&
      value !== null &&
      Object.prototype.toString.call(value) === "[object Date]" &&
      !isNaN((value as Date).getTime())
    ) {
      const dateValue = value as Date;
      const day = dateValue.getDate().toString().padStart(2, "0");
      const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
      const year = dateValue.getFullYear();
      normalizedValue = `${day}.${month}.${year}`;
    } else if (typeof value === "string" && value.length === 10) {
      normalizedValue = value;
    } else {
      normalizedValue = null;
    }
    const dateForPicker = parseDDMMYYYY(normalizedValue);
    const styles = useDatePickerStyles({
      fullWidth,
      value: !!dateForPicker,
      theme,
      error,
      hasCustomLayout: !!customLayout,
      hasInputReplacer: !!inputReplacer,
      isTable
    });
    const [currentView, setCurrentView] = useState<"day" | "month"  | "year">(
      "day"
    );
    const [monthPanelYear, setMonthPanelYear] = useState(
      new Date().getFullYear()
    );

    const today = new Date()
    const yesterday = subDays(startOfDay(today), 0)
    const previousYearDate = subYears(today, 1)

    const [yearsRange, setYearsRange] = useState({
      min: previousYearDate,
      max: new Date(previousYearDate.getFullYear() + 11, 0, 1)
    })

    const [viewMonthDate, setViewMonthDate] = useState<Date>()

    const customOpenerRef = useRef<HTMLElement>(null);
    const resolvedOpen = open !== undefined ? open : isOpen;

    const handleInputClick = () => {
      !disabled && setIsOpen(true);
      onOpen && onOpen();
    };

    const handleClose = () => {
      onClose && onClose();
      setIsOpen(false);
    };

    useEffect(() => {
      if (!resolvedOpen) return;

      const onPointerDownCapture = (e: PointerEvent) => {
        const el = e.target as Element | null;
        if (!el) return;
        if (el.closest(".MuiPickersPopper-root, .MuiPopper-root")) return;

        onClose && onClose();
        setIsOpen(false);
      };
      document.addEventListener("pointerdown", onPointerDownCapture, true);
      return () => {
        document.removeEventListener("pointerdown", onPointerDownCapture, true);
      };
    }, [resolvedOpen, onClose]);

    const handleTodayClick = () => {
      const today = new Date();
      onChange && onChange(today);
      handleClose();
    };

    useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    return (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ru}
        dateFormats={{ monthShort: "LLL" }}
      >
        <FieldWrapper
          className={styles[className]}
          label={label}
          hint={hintText}
          isDisabled={disabled}
          isInvalid={error}
          data-test-id={fieldName}
        >
          {customOpener &&
            customOpener({
              isOpen,
              setAnchorRef: (node) => {
                customOpenerRef.current = node;
              },
              onClick: () => {
                setIsOpen(true);
              },
            })}

          <MuiDatePicker
            className={styles.wrapper}
            value={dateForPicker}
            onChange={(newDate) => {
              if (currentView === "month" && newDate) {
                const selectedYear = monthPanelYear;
                const selectedMonth = newDate.getMonth();
                let day = dateForPicker ? dateForPicker.getDate() : 1;
                const lastDayOfMonth = new Date(
                  selectedYear,
                  selectedMonth + 1,
                  0
                ).getDate();
                if (day > lastDayOfMonth) {
                  day = lastDayOfMonth;
                }
                const newDayDate = new Date(selectedYear, selectedMonth, day);
                onChange && onChange(newDayDate);
                setCurrentView("day");
              } else {
                onChange && onChange(newDate);
              }
            }}
            inputRef={ref}
            disabled={disabled}
            closeOnSelect={open === undefined}
            open={resolvedOpen}
            onClose={handleClose}
            onOpen={handleInputClick}
            views={["year", "month", "day"]}
            format={DATE_FORMAT}
            dayOfWeekFormatter={(weekday) => formatDate(weekday, "cccccc")}
            localeText={{
              cancelButtonLabel: "Отмена",
              okButtonLabel: "Выбрать",
              todayButtonLabel: "Сегодня",
              fieldDayPlaceholder: () => "ДД",
              fieldMonthPlaceholder: () => "ММ",
              fieldYearPlaceholder: () => "ГГГГ",
            }}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            onViewChange={setCurrentView}
            slotProps={{
              popper: {
                className: styles.popper,
                placement: position,
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 4],
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      altBoundary: true,
                    },
                  },
                ],
                // не передавать в объект напрямую
                // ломается позиционирование                ...(customOpener ? { anchorEl: customOpenerRef.current } : {}),
              },
              actionBar: {
                actions: [],
              },
              textField: customOpener
                ? {
                  sx: { display: "none" },
                }
                : inputReplacer
                  ? {
                    placeholder,
                    InputProps: {
                      endAdornment: (
                        <>
                          <Box className={styles.inputPostfix}>
                            {inputReplacer}
                          </Box>
                          <IconButton onClick={handleInputClick}>
                            <DateIcon/>                          </IconButton>                        </>                      ),
                    },
                  }
                  : {
                    placeholder,
                  },
            }}
            slots={{
              layout: customLayout,
              actionBar:
                currentView === "day"
                  ? () => (
                    <Footer
                      text={'Сегодня'}
                      onClick={handleTodayClick}
                    />
                  )
                  : () => null,
              openPickerIcon: () => <DateIcon />,
              calendarHeader: (props) => (
                <CalendarHeader
                  {...props}
                  currentView={currentView}
                  monthPanelYear={monthPanelYear}
                  setMonthPanelYear={setMonthPanelYear}
                  yearsRange={yearsRange}
                  setYearsRange={setYearsRange}
                  setViewMonthDate={setViewMonthDate}
                />
              ),
            }}
          />
        </FieldWrapper>
      </LocalizationProvider>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;