import React from "react";
import { ButtonType, CustomButtonProps } from "./types";
import { useStyles } from "./styles";
import { Button, useTheme } from "@mui/material";
import { Preloader, preloaderSize } from "../../Preloader";

const BaseButton: React.FC<CustomButtonProps> = ({
  onClick,
  buttonType = ButtonType.default,
  isLoad = false,
  isDisabled = false,
  startIcon,
  endIcon,
  children,
  className = "",
  ButtonAction = "button",
  form,
  fullWidth,
  dataTestId = "base-button",
  allowTextWrap = false,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme, allowTextWrap)();

  const getClassName = (buttonType: ButtonType, className: string): string => {
    const typeClassMap: Partial<Record<ButtonType, string>> = {
      [ButtonType.light]: classes.light,
      [ButtonType.outlined]: classes.outlined,
      [ButtonType.iconOutlined]: classes.iconOutlined,
      [ButtonType.default]: "",
    };

    const typeClass = typeClassMap[buttonType] ?? "";
    const customClass = className && classes[className as keyof typeof classes];

    return `${classes.button} ${typeClass} ${customClass || ""}`.trim();
  };

  const preloaderIcon = <Preloader size={preloaderSize.regular} />;

  return (
    <Button
      disableRipple
      className={getClassName(buttonType, className)}
      onClick={onClick}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      type={ButtonAction}
      loading={isLoad}
      loadingIndicator={preloaderIcon}
      loadingPosition="center"
      form={form}
      fullWidth={fullWidth}
      data-test-id={dataTestId}
    >
      <span className={classes.buttonText}>{children}</span>
    </Button>
  );
};

export default BaseButton;
