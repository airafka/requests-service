import { forwardRef, useId, useCallback } from "react";
import classNames from "classnames";
import { useTheme } from "@mui/material";

import { FieldWrapper } from "@/lib";

import { useInputTextStyles } from "./styles";
import { InputTextProps } from "./types";

const ALPHANUMERIC_PATTERN = /^[a-zA-Zа-яА-ЯёЁ0-9]*$/;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      value = "",
      onChange,
      placeholder,
      className,
      disabled = false,
      error = false,
      label,
      onFocus,
      onBlur,
      iconStart,
      iconEnd,
      type = "text",
      min,
      max,
      minLength,
      maxLength,
      borderRadius,
      autoFocus,
      sx,
      autoComplete,
      hintText,
      allowOnlyAlphanumeric = false,
      iconStartBehavior = "dynamic",
      dataTestId = "defaultDataTestId",
      borderColor,
      isTable
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = useInputTextStyles({
      theme,
      hasValue: !!value,
      isDisabled: disabled,
      isInvalid: error,
      iconStartBehavior,
      borderColor,
      isTable
    })()
    const id = useId();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => onFocus?.(e);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => onBlur?.(e);

    const filterAlphanumeric = useCallback((text: string): string => {
      return text
        .split("")
        .filter((char) => ALPHANUMERIC_PATTERN.test(char))
        .join("");
    }, []);

    const inputParams =
      type === "number"
        ? {
            type: "number",
            min,
            max,
            onFocus: handleFocus,
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
              if (e.target.value === "") {
                onChange?.(e);
                handleBlur(e);
                return;
              }
              const value = +e.target.value;
              if (typeof max === "number" && value > max) {
                e.target.value = max.toString();
              } else if (typeof min === "number" && value < min) {
                e.target.value = min.toString();
              } else {
                e.target.value = value.toString();
              }
              onChange?.(e);
              handleBlur(e);
            },
          }
        : type === "password"
          ? { type: "password", onFocus: handleFocus, onBlur: handleBlur }
          : { type, onFocus: handleFocus, onBlur: handleBlur };

    return (
      <FieldWrapper
        className={className}
        inputId={id}
        label={label}
        hint={hintText}
        isDisabled={disabled}
        isInvalid={error}
        hasValue={!!value}
        style={sx as React.CSSProperties}
      >
        <div className={styles.inputWrapper}>
          {iconStart && (
            <span className={classNames(styles.icon, styles.iconStart)}>
              {iconStart}
            </span>
          )}
          <input
            {...inputParams}
            id={id}
            autoFocus={autoFocus}
            minLength={minLength}
            maxLength={maxLength}
            value={value ?? ""}
            onBeforeInput={(event: React.InputEvent<HTMLInputElement>) => {
              const data = event.data;
              const input = event.currentTarget;
              const startAt = (input.selectionStart ?? 0) === 0;

              if (data && startAt && /^\s+/u.test(data)) {
                event.preventDefault();
                const cleaned = data.replace(/^\s+/u, "");
                if (cleaned) {
                  input.setRangeText(
                    cleaned,
                    input.selectionStart ?? 0,
                    input.selectionEnd ?? 0,
                    "end"
                  );
                }
                return;
              }

              if (
                allowOnlyAlphanumeric &&
                data &&
                !ALPHANUMERIC_PATTERN.test(data)
              ) {
                event.preventDefault();
              }
            }}
            onPaste={(event) => {
              if (allowOnlyAlphanumeric) {
                event.preventDefault();
                const pastedText = event.clipboardData.getData("text");
                const filtered = filterAlphanumeric(pastedText);
                if (filtered) {
                  const input = event.currentTarget;
                  const start = input.selectionStart ?? 0;
                  const end = input.selectionEnd ?? 0;
                  const newValue =
                    input.value.slice(0, start) +
                    filtered +
                    input.value.slice(end);
                  input.value = newValue;
                  input.setSelectionRange(
                    start + filtered.length,
                    start + filtered.length
                  );
                  const syntheticEvent = {
                    ...event,
                    target: { ...input, value: newValue },
                    currentTarget: { ...input, value: newValue },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange?.(syntheticEvent);
                }
              }
            }}
            onChange={(event) => {
              onChange?.(event);
            }}
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames(styles.inputField, {
              [styles.inputFieldWithIconStart]: iconStart,
              [styles.inputFieldWithIconEnd]: iconEnd,
            })}
            style={{
              borderRadius,
            }}
            autoComplete={autoComplete}
            data-test-id={dataTestId}
          />
          {iconEnd && (
            <span className={classNames(styles.icon, styles.iconEnd)}>
              {iconEnd}
            </span>
          )}
        </div>
      </FieldWrapper>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;
