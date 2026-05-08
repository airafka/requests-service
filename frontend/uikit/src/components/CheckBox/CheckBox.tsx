import React, { forwardRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import { DoneToggleIcon } from "../../icons";
import checkboxStyles from "./styles";
import { ICheckBoxProps } from "./types";
import { CommonSize } from "../Button/BaseButton";
import { useTheme } from "@mui/material/styles";
import { IndeterminateIcon } from '@/icons'

const mapSizeToMUI = (size: CommonSize): "medium" | "large" => {
  return size === CommonSize.Large ? "large" : "medium";
};

const CheckBox = forwardRef<HTMLInputElement, ICheckBoxProps>(
  (
    {
      id,
      checked,
      onClick,
      onChange,
      isDisabled = false,
      isRequired = false,
      size = CommonSize.Medium,
      className, 
      onSelect,
      dataTestId,
      error,
      indeterminate
    },
    ref
  ) => {
    const theme = useTheme();
    const classes = checkboxStyles({ theme, size, isDisabled, checked, error, indeterminate });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        return;
      }

      const isChecked = event.target.checked;
      if (onClick) {
        onClick({ checked: isChecked, event });
      }
      if (onChange) {
        onChange(event);
      }

      if (onSelect) {
        onSelect(isChecked);
      }
    };

    return (
      <Checkbox
        id={id}
        checked={checked ?? false}
        onChange={handleChange}
        disabled={isDisabled}
        inputRef={ref}
        required={isRequired}
        size={mapSizeToMUI(size)}
        disableRipple
        className={`${classes[className]} ${classes.container}`} 
        icon={indeterminate ? <IndeterminateIcon className={classes.checkbox} /> : <span className={classes.checkbox} />}
        checkedIcon={
          <DoneToggleIcon className={`${classes.checkbox} Mui-checked`} />
        }
        data-test-id={dataTestId}
      />
    );
  }
);

CheckBox.displayName = "CheckBox";
export default CheckBox;
