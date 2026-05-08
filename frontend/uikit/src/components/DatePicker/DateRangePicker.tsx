import { FC, useMemo, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PickerPositions } from "@/types";
import { FieldWrapper } from "@/lib";
import { ChevronIcon, XThinIcon } from "@/icons";
import { Dropdown } from "@/components/DropDown";
import CustomDatePicker from "./DatePicker";
import type {
  CustomDateRangePickerProps,
  DatePickerRange,
  DatePickerRangeS,
} from "./types";
import { useDatePickerStyles } from "./styles";

const isoToLocal = (args: {
  dateIso: string | null | undefined;
  placeholder: string;
}) =>
  args.dateIso ? new Date(args.dateIso).toLocaleDateString() : args.placeholder;
export const DateRangePicker: FC<CustomDateRangePickerProps> = ({
  onChange,
  value,
  placeholder,
  disabled = false,
  error = false,
  fullWidth = false,
  position = PickerPositions.BOTTOM_START,
  label,
  hintText,
  className,
  customOpener,
  ...restProps
}) => {
  const [valueLocal, setValueLocal] = useState<DatePickerRange>(
    value ?? { start: null, end: null }
  );

  useEffect(() => {
    setValueLocal(value ?? { start: null, end: null });
  }, [value]);

  const getIsError = (val: DatePickerRange): boolean => {
    return val?.start && val?.end
      ? new Date(val?.start) > new Date(val?.end)
      : false;
  };
  const getIsClear = (val: DatePickerRange): boolean => {
    if (!val) {
      return true;
    }
    if (!val.start && !val.end) {
      return true;
    }
    return false;
  };
  const handlerSetValue = (args: {
    key: keyof DatePickerRangeS;
    val: Date | null;
  }) => {
    const newVal: DatePickerRange = {
      start:
        args.key === "start"
          ? args.val
            ? args.val.toISOString()
            : null
          : valueLocal?.start ?? null,
      end:
        args.key === "end"
          ? args.val
            ? args.val.toISOString()
            : null
          : valueLocal?.end ?? null,
    };
    setValueLocal(newVal);
    if (!getIsError(newVal)) {
      onChange?.({
        start: newVal.start ?? null,
        end: newVal.end ?? null,
      });
    }
  };
  const handlerClear = (evt: React.MouseEvent) => {
    evt.stopPropagation();

    setValueLocal(undefined);
    onChange?.(undefined);
  };
  const valueString = useMemo<string>(() => {
    return `${
      placeholder && !valueLocal?.start && !valueLocal?.end
        ? `${placeholder.trim()}: `
        : ``
    }${isoToLocal({
      dateIso: valueLocal?.start,
      placeholder: "От",
    })} - ${isoToLocal({
      dateIso: valueLocal?.end,
      placeholder: "До",
    })}`;
  }, [valueLocal?.end, valueLocal?.start, placeholder]);

  const isError = useMemo(() => getIsError(valueLocal), [valueLocal]);
  const isClear = useMemo(() => getIsClear(valueLocal), [valueLocal]);

  const theme = useTheme();
  const classes = useDatePickerStyles({
    theme,
    fullWidth,
  });

  function toDDMMYYYY(date: string | null | undefined): string | null {
    if (!date) {
      return null;
    }
    let d: Date;
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      const [day, month, year] = date.split(".");
      d = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) {
      return null;
    }
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <FieldWrapper
      className={classes[className]}
      label={label}
      hint={hintText}
      isDisabled={disabled}
      isInvalid={error}
    >
      <Dropdown
        position={position}
        opener={({ isOpen, onOpen, setAnchorRef }) => {
          const styles = useDatePickerStyles({
            theme,
            open: isOpen,
            disabled,
            value: !isClear,
            error: isError || error,
          });

          return customOpener ? (
            customOpener({ isOpen, setAnchorRef, onClick: onOpen })
          ) : (
            <Box
              className={styles.wrapper}
              ref={setAnchorRef}
              onClick={() => {
                if (disabled) {
                  return;
                }

                onOpen();
              }}
            >
              <Typography fontSize={14} className={styles.valueOutput }>
                {valueString}
              </Typography>

              <Box className={styles.rangeControls }>
                {!isClear && <XThinIcon onClick={handlerClear} />}
                <ChevronIcon className="chevronIcon" />
              </Box>
            </Box>
          );
        }}
      >
        <CustomDatePicker
          key={"start"}
          {...restProps}
          fullWidth
          position={position}
          error={isError || error}
          disabled={disabled}
          value={toDDMMYYYY(valueLocal?.start)}
          onChange={(val) => handlerSetValue({ key: "start", val })}
        />

        <CustomDatePicker
          key={"end"}
          {...restProps}
          fullWidth
          position={position}
          error={isError || error}
          disabled={disabled}
          value={toDDMMYYYY(valueLocal?.end)}
          onChange={(val) => handlerSetValue({ key: "end", val })}
        />
      </Dropdown>
    </FieldWrapper>
  );
};
