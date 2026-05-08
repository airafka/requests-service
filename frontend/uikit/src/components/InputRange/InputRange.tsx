import { FC, useEffect, useMemo, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { FieldWrapper } from "@/lib";
import { ChevronIcon, XThinIcon } from "@/icons";
import { Dropdown } from "@/components/DropDown";
import { InputText } from "@/components/InputText";
import type { InputRangeValue, InputRangeProps } from "./types";
import { useInputRangeStyles } from "./styles";

export const InputRange: FC<InputRangeProps> = ({
  className,
  value,
  label,
  hintText,
  placeholder,
  disabled,
  error,
  onChange,
  customOpener,
}) => {
  const [valueLocal, setValueLocal] = useState<InputRangeValue | undefined>(
    value
  );
  useEffect(() => {
    setValueLocal(value);
  }, [value]);

  const getIsError = (val: InputRangeValue | undefined): boolean => {
    if ((!val?.from && val?.to) || (val?.from && !val?.to)) {
      return true;
    }
    return Number(val?.from) > Number(val?.to);
  };
  const handlerSetValue = (args: {
    key: keyof InputRangeValue;
    val: string;
  }) => {
    const newVal: InputRangeValue = {
      ...valueLocal,
      [args.key]: Number(args.val),
    };
    setValueLocal(newVal);
    if (!getIsError(newVal)) {
      onChange?.(newVal);
    }
  };
  const handleClearClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();

    setValueLocal(undefined);
    onChange?.(undefined);
  };
  const valueString = useMemo<string>(() => {
    const getVal = (args: { str: number | undefined; placeholder: string }) =>
      args.str ?? args.placeholder;

    return `${placeholder ? placeholder + ": " : ""}${getVal({
      str: valueLocal?.from,
      placeholder: "От",
    })} - ${getVal({
      str: valueLocal?.to,
      placeholder: "До",
    })}`;
  }, [valueLocal?.to, valueLocal?.from, placeholder]);

  const isError = useMemo(() => getIsError(valueLocal), [valueLocal]);

  return (
    <FieldWrapper
      className={className}
      label={label}
      hint={hintText}
      isDisabled={disabled}
      isInvalid={error}
    >
      <Dropdown
        opener={({ isOpen, onOpen, setAnchorRef }) => {
          const theme = useTheme();
          const styles = useInputRangeStyles({
            theme,
            open: isOpen,
            disabled,
            error: isError || error,
          });

          return customOpener ? (
            customOpener({ isOpen, setAnchorRef, onClick: onOpen })
          ) : (
            <Box
              sx={{ ...styles.wrapper }}
              ref={setAnchorRef}
              onClick={() => {
                if (disabled) {
                  return;
                }

                onOpen();
              }}
            >
              <Typography fontSize={14}>{valueString}</Typography>

              <Box sx={{ ...styles.rangeControls }}>
                {(valueLocal?.to || valueLocal?.from) && (
                  <XThinIcon onClick={handleClearClick} />
                )}
                <ChevronIcon className="chevronIcon" />
              </Box>
            </Box>
          );
        }}
      >
        <InputText
          type={"number"}
          placeholder={"от"}
          error={isError}
          value={String(valueLocal?.from)}
          onChange={(e) =>  handlerSetValue({ key: "from", val: e.target.value })}
        />

        <InputText
          type={"number"}
          placeholder={"до"}
          error={isError}
          value={String(valueLocal?.to)}
          onChange={(e) => handlerSetValue({ key: "to", val: e.target.value })}
        />
      </Dropdown>
    </FieldWrapper>
  );
};
