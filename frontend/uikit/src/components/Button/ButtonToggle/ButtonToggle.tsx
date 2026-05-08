import React, { useMemo } from "react";
import { ToggleButtonGroup, ToggleButton, useTheme } from "@mui/material";
import { ButtonToggleProps, ToggleSize, ToggleColor } from "./types";
import { useStyles } from "./styles";

export const ButtonToggle = <T extends string | number = string>({
  options,
  value,
  onChange,
  exclusive = true,
  disabled = false,
  fullWidth = false,
  size = ToggleSize.medium,
  color = ToggleColor.standard,
  className = "",
  dataTestId = "button-toggle",
  ariaLabel,
}: ButtonToggleProps<T>) => {
  const theme = useTheme();

  const checkAllowTextWrap = useMemo(() => {
    return options.some((option) => option.allowTextWrap);
  }, [options]) as boolean;

  const classes = useStyles(theme, size, checkAllowTextWrap)();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: T | T[] | null,
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  const toggleGroupClassName = `${classes.toggleGroup} ${
    fullWidth ? classes.fullWidth : ""
  } ${className}`.trim();

  return (
    <ToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={handleChange}
      disabled={disabled}
      className={toggleGroupClassName}
      color={color}
      size={size}
      aria-label={ariaLabel}
      data-test-id={dataTestId}
    >
      {options.map((option) => {
        return (
          <ToggleButton
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
            className={
              option.allowTextWrap
                ? `${classes.toggleButton} ${classes.toggleButtonWithWrap}`
                : classes.toggleButton
            }
            aria-label={option.ariaLabel}
            data-test-id={`${dataTestId}-${String(option.value)}`}
          >
            {option.icon && <span>{option.icon}</span>}
            <span
              className={
                option.allowTextWrap ? classes.buttonLabelWithWrap : ""
              }
            >
              {option.label}
            </span>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default ButtonToggle;
