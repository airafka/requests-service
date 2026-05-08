import classNames from "classnames";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import {
  type PickersLayoutProps,
  type DateView,
  PickersLayout,
  MultiSectionDigitalClock,
} from "@mui/x-date-pickers";
import { parseDate, formatDate, isValid } from "@/helpers";
import { DatePicker } from "../DatePicker";
import type {
  DateTimePickerProps,
  TimeInterval,
  ValidationState,
} from "./DateTimePicker.types";
import { useDateTimePickerStyles } from "./DateTimePicker.styles";
import { getValidationState } from "./validation";

export const DateTimePicker = ({
   value,
   chosenInterval: chosenTimeInterval,
   timeIntervals,
   placeholder,
   onChange,
   onIntervalChange,
   isExactTime,
   requiredTime = false,
   onValidationChange,
   customOpener,
   fieldName,
  isTable,
   ...props
 }: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [date, setDate] = useState<Date | null>(() => {
    if (!value) return null;
    const parsed = parseDate(value, "dd.MM.yyyy");
    return isValid(parsed) ? parsed : null;
  });

  const [time, setTime] = useState<Date | null>();
  const [timeTouched, setTimeTouched] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<TimeInterval | undefined>(
    chosenTimeInterval
  );

  const today = new Date();
  const currentTime = today.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const todayBlock = Object.entries(timeIntervals).find(([labels, intervals]) => {
    if (labels === 'Вечер'){
      return intervals.find(interval => interval.from >= currentTime)
    }
  })

  const prevValidationRef = useRef<ValidationState | null>(null);

  // вычисляет текущее состояние валидации и вызывает onValidationChange при изменении

  const computeAndEmitValidation = useCallback(
    (
      currentDate: Date | null,
      currentTime: Date | null | undefined,
      currentTimeTouched: boolean,
      currentTimeInterval: TimeInterval | undefined
    ): ValidationState => {
      const validationState = getValidationState({
        date: currentDate,
        isDateValid: currentDate ? isValid(currentDate) : false,
        isExactTime: !!isExactTime,
        time: currentTime,
        timeTouched: currentTimeTouched,
        timeInterval: currentTimeInterval,
        requiredTime,
      });

      if (onValidationChange) {
        const prev = prevValidationRef.current;
        if (
          !prev ||
          prev.isValid !== validationState.isValid ||
          prev.reason !== validationState.reason
        ) {
          onValidationChange(validationState);
        }
      }
      prevValidationRef.current = validationState;

      return validationState;
    },
    [isExactTime, requiredTime, onValidationChange]
  );

  /**
   * при requiredTime === true отдаёт null, если валидация не пройдена.   */  const emitChange = useCallback(
    (
      newDate: Date | null,
      newTime: Date | null | undefined,
      newTimeTouched: boolean,
      newTimeInterval: TimeInterval | undefined
    ) => {
      const validationState = computeAndEmitValidation(
        newDate,
        newTime,
        newTimeTouched,
        newTimeInterval
      );

      if (!onChange) return;

      if (requiredTime) {
        if (validationState.isValid) {
          onChange(newDate);
        } else {
          onChange(null);
        }
      } else {
        // отдаём как есть
        onChange(newDate);
      }
    },
    [computeAndEmitValidation, onChange, requiredTime]
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange = (newValue: Date | null) => {
    const shouldResetTime = requiredTime && date !== null && newValue !== null;

    setDate(newValue);

    if (shouldResetTime) {
      setTime(null);
      setTimeTouched(false);
      setTimeInterval(undefined);
      emitChange(newValue, null, false, undefined);
    } else {
      emitChange(newValue, time, timeTouched, timeInterval);
    }

    if (!shouldResetTime && newValue && timeInterval && onIntervalChange) {
      onIntervalChange({
        dates: [
          parseDate(timeInterval.from, "HH:mm", newValue),
          parseDate(timeInterval.to, "HH:mm", newValue),
        ],
        interval: timeInterval,
      });
    }
  };

  const handleTimeChange = (
    newValue: Date | null,
  ) => {
    setTime(newValue);
    setTimeTouched(true);
  };

  const acceptTimeChange = () => {
    if (!date) {
      setDate(today)
    }
    emitChange(date, time, timeTouched, timeInterval);
    handleClose()
  }

  const installToday = () => {
    setTime(today)
    setDate(today)
    handleClose()
  }

  const handleIntervalButtonClick = (interval: TimeInterval) => {
    const newDate = parseDate(interval.from, "HH:mm", date ? date : today);
    setDate(newDate);
    setTimeInterval(interval);

    emitChange(newDate, time, timeTouched, interval);

    if (onIntervalChange) {
      onIntervalChange({
        dates: [newDate, parseDate(interval.to, "HH:mm", date)],
        interval,
      });
    }

    setIsOpen(false);
  };

  const filteredIntervals = (intervals: Record<string, TimeInterval[]> ): Record<string, TimeInterval[]> => {
    if (date && date.toDateString() !== today.toDateString()) {
      return intervals;
    }
    const newIntervals = {}
    Object.entries(intervals).map(([label, intervals]) => {
      const filteredIntervals = intervals.filter((interval) => interval.from > currentTime)
      if (filteredIntervals.length > 0) {
        newIntervals[label] = filteredIntervals;
      }
    })
    if (Object.keys(newIntervals).length === 0) {
      return {
        '': []
      }
    }
    return newIntervals;
  }


  const TimePickerLayout = (
    props: PickersLayoutProps<Date | null, Date, DateView>
  ) => {
    const theme = useTheme();
    const styles = useDateTimePickerStyles({ theme, isExactTime });

    return (
      <>
        <div className={styles.root} data-test-id={`timePicker-${fieldName}`}>
          <PickersLayout {...props} />

          <div            className={styles.container}
          >
            <Typography variant={'body2'} className={styles.header}>
              {isExactTime ? 'Время' :  formatDate(date && isValid(date) ? date : today, "d MMMM")}
            </Typography>

            {isExactTime ? (
              <>
                <div className={styles.timePicker}>
                  <MultiSectionDigitalClock
                    value={time}
                    onChange={handleTimeChange}
                    timeSteps={{
                      minutes: 1
                  }}
                    shouldDisableTime={(value, view) => {
                      if (view === 'hours') {
                        if (!date || date.toDateString() === today.toDateString()) {
                          return value.getHours() < (today.getHours() + 1)
                        }
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              timeIntervals && (
                <>
                  <div className={styles.timeIntervalsPicker}>
                    {Object.entries(filteredIntervals(timeIntervals)).map(([label, intervals]) => (
                      <div key={label} className={styles.group}>
                        <p className={styles.groupLabel}>{label}</p>

                        <div className={styles.groupIntervals}>
                          {intervals.map((interval) => {
                            const isChosen =
                              timeInterval?.from === interval.from &&
                              timeInterval?.to === interval.to;

                            return (
                              <button
                                key={interval.from + interval.to}
                                className={classNames(
                                  styles.intervalButton,
                                  isChosen && styles.intervalButton_isChosen
                                )}
                                onClick={() =>
                                  handleIntervalButtonClick(interval)
                                }
                              >
                                {interval.from} - {interval.to}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            )}

            <div className={styles.footer}>
              {!timeIntervals &&
                  <>
                      <Button
                        variant="outlined"
                        onClick={installToday}
                        className={styles.nowButton}
                      >
                          Сейчас
                      </Button>
                      <Button variant="contained" onClick={acceptTimeChange} className={styles.okButton}>
                          Ок
                      </Button>
                  </>              }
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (!value) {
      setDate(null);
      setTime(null);
      setTimeTouched(false);
      setTimeInterval(undefined);
    } else {
      const parsed = parseDate(value, "dd.MM.yyyy");
      if (isValid(parsed)) {
        setDate(parsed);
      }
    }
  }, [value]);

  useEffect(() => {
    setTimeInterval(chosenTimeInterval);
  }, [chosenTimeInterval]);

  useEffect(() => {
    if (!isOpen && date && !timeInterval && timeIntervals) {
      const nearestInterval = Object.values(timeIntervals).find(intervals => {
        return intervals.find(time => time.from > currentTime)
      }).find(time => time.from > currentTime);
      const newDate = parseDate(nearestInterval.from, "HH:mm", date ? date : today);
      setDate(newDate);
      setTimeInterval(nearestInterval);

      emitChange(newDate, time, timeTouched, nearestInterval);

      if (onIntervalChange) {
        onIntervalChange({
          dates: [newDate, parseDate(nearestInterval.to, "HH:mm", date)],
          interval: nearestInterval,
        });
      }
    }
    if (!isOpen && date && isExactTime && !time) {
      setTime(today)
      setTimeTouched(true);
      emitChange(date, time, timeTouched, timeInterval);
    }
  }, [isOpen]);

  useEffect(() => {
    computeAndEmitValidation(date, time, timeTouched, timeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasTimeError =
    date && isValid(date) && (isExactTime ? !time : !timeInterval);

  return (
    <>
      <DatePicker
        {...props}
        value={date && isValid(date) ? formatDate(date, "dd.MM.yyyy") : value}
        isTable={isTable}
        customLayout={TimePickerLayout}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleDateChange}
        open={isOpen}
        error={hasTimeError || props.error}
        placeholder={placeholder || "ДД.ММ.ГГГГ чч:мм – чч:мм"}
        shouldDisableToday={!!todayBlock}
        inputReplacer={
         date && isValid(date)
           ? `${formatDate(date, "dd.MM.yyyy")}${
             isExactTime
               ? time
                 ? ` ${formatDate(time, "HH:mm")}`
                 : ""
               : timeInterval
                 ? ` ${timeInterval.from} - ${timeInterval.to}`
                 : ""
           }`
           : undefined
       }
       customOpener={
         customOpener
           ? ({ isOpen, setAnchorRef, onClick }) =>
             customOpener({
               isOpen,
               setAnchorRef,
               onClick: () => {
                 setIsOpen(true);
                 onClick();
               },
             })
           : undefined
       }
      />
    </>  );
};