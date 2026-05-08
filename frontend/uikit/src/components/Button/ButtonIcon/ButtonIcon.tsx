import React from "react";
import { useStyles } from "./styles";
import { Button, useTheme } from "@mui/material";
import {
  ButtonIconProps,
  ButtonSize,
  ButtonIconType,
  ButtonIconColor,
} from "./types";
import classNames from "classnames";

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  size = ButtonSize.Regular,
  buttonType = ButtonIconType.Light,
  isDisabled = false,
  color = ButtonIconColor.Primary,
  className = "",
  dataTestId = "button-icon",
}) => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  const sizeClassMap: Record<ButtonSize, string> = {
    [ButtonSize.Small]: classes.buttonSmall,
    [ButtonSize.Regular]: classes.buttonRegular,
  };

  const buttonTypeClassMap: Record<ButtonIconType, string> = {
    [ButtonIconType.Default]: classes.buttonColorDefault,
    [ButtonIconType.Light]: classes.buttonColorLight,
  };

  const colorClassMap: Partial<Record<ButtonIconColor, string>> = {
    [ButtonIconColor.Success]: classes.iconSuccess,
    [ButtonIconColor.Error]: classes.iconError,
    [ButtonIconColor.Gray]: classes.iconGray,
  };

  const customClass = className && classes[className as keyof typeof classes];

  return (
    <Button
      disableRipple
      startIcon={icon}
      onClick={onClick}
      disabled={isDisabled}
      data-test-id={dataTestId}
      className={classNames(
        classes.button,
        sizeClassMap[size],
        buttonTypeClassMap[buttonType],
        colorClassMap[color],
        customClass,
        {
          [classes.buttonDisabled]: isDisabled,
        }
      )}
    />
  );
};

export default ButtonIcon;
