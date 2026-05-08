import { useState, useRef, forwardRef } from "react";
import { ru } from "date-fns/locale";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { PickerPositions } from "@/types";
import { TimeIcon } from "@/icons";
import { FieldWrapper } from "@/lib";

import type { CustomTimePickerProps } from "./types";
import { TIME_FORMAT } from "./format";
import { useTimePickerStyles } from "./styles";

const CustomTimePicker = forwardRef<HTMLInputElement, CustomTimePickerProps>(
  (
    {
      value = null,
      onChange,
      disabled = false,
      error = false,
      fullWidth = false,
      position = PickerPositions.BOTTOM_START,
      label,
      hintText,
      className,
      customOpener,
    },
    ref
  ) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [internalTimeValue, setInternalTimeValue] = useState<Date | null>(
      value ? new Date(value) : null
    );
    const styles = useTimePickerStyles({
      fullWidth,
      value: Boolean(internalTimeValue),
      theme,
      disabled,
      error,
    });

    const customOpenerRef = useRef<HTMLElement>(null);

    const handleInputClick = () => !disabled && setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    const handleTimeChange = (time: Date | null) => {
      setInternalTimeValue(time);
    };

    const handleNowClick = () => {
      const now = new Date();
      handleTimeChange(now);
      handleClose();
    };

    const handleAcceptClick = () => {
      onChange && onChange(internalTimeValue)
      handleClose()
    }

    const CustomFooter = () => (
      <Paper className={styles.footer}>
        <Button
          variant="outlined"
          onClick={handleNowClick}
          className={styles.nowButton}
        >
          Сейчас
        </Button>
        <Button variant="contained" onClick={handleAcceptClick} className={styles.okButton}>
          Ок
        </Button>
      </Paper>
    );

    const CustomToolbar = () => {
      return (
        <Typography variant={"body2"} className={styles.header}>
          Время
        </Typography>
      )
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <FieldWrapper
          className={styles[className]}
          label={label}
          hint={hintText}
          isDisabled={disabled}
          isInvalid={error}
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

          <TimePicker
            className={styles.wrapper}
            value={internalTimeValue}
            onChange={handleTimeChange}
            inputRef={ref}
            disabled={disabled}
            open={isOpen}
            onClose={handleClose}
            onOpen={handleInputClick}
            onAccept={() => {}}
            views={["hours", "minutes"]}
            closeOnSelect={false}
            format={TIME_FORMAT}
            localeText={{
              cancelButtonLabel: "Отмена",
              okButtonLabel: "Выбрать",
              todayButtonLabel: "Сегодня",
              fieldHoursPlaceholder: () => "ЧЧ",
              fieldMinutesPlaceholder: () => "MM",
            }}
            timeSteps={{
              minutes: 1,
            }}
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
                // ломается позиционирование
                ...(customOpener ? { anchorEl: customOpenerRef.current } : {}),
              },
              textField: customOpener
                ? {
                    sx: { display: "none" },
                  }
                : null,
              actionBar: {
                actions: [],
              },
            }}
            slots={{
              actionBar: CustomFooter,
              openPickerIcon: () => <TimeIcon />,
              toolbar: CustomToolbar
            }}
          />
        </FieldWrapper>
      </LocalizationProvider>
    );
  }
);

CustomTimePicker.displayName = "CustomTimePicker";

export default CustomTimePicker;
