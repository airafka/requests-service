import React, { forwardRef } from "react";

import { InputText } from "../InputText";
import { MailInputIcon } from "@/icons";

import { InputEmailProps } from "./types";

const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  (
    {
      value,
      onChange,
      placeholder = "example@mail.ru",
      className,
      disabled = false,
      error = false,
      label,
      hintText,
      onFocus,
      onBlur,
      iconStart = <MailInputIcon />,
      borderColor,
      isTable
    },
    ref
  ) => {
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    };

    return (
      <InputText
        type="email"
        value={value}
        onChange={handleEmailChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        error={error}
        label={label}
        hintText={hintText}
        onFocus={onFocus}
        onBlur={onBlur}
        iconStart={iconStart}
        borderColor={borderColor}
        isTable={isTable}
        ref={ref}
      />
    );
  }
);

InputEmail.displayName = "InputEmail";

export default InputEmail;
