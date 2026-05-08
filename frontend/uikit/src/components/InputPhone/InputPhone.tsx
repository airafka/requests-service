import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useId,
  ChangeEvent,
} from "react";
import { useTheme } from "@mui/material";
import type { InputPhoneProps } from "./types";
import inputPhoneStyles from "./styles";
import { ChinaFlag, RussianFlag, RussianFlagDisabled } from "@/icons";
import { formatPhoneMask } from "./helpers/helpers";
import { InputText } from "../InputText";

const InputPhone = forwardRef<HTMLInputElement | null, InputPhoneProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder,
      disabled = false,
      error = false,
      label,
      hintText,
      defaultCountry = 'ru',
      dataTestId = "defaultDataTestId",
      borderColor,
      isTable
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = inputPhoneStyles({
      theme,
      isDisabled: disabled,
      isInvalid: error,
    });
    const innerRef = useRef<HTMLInputElement>(null);

    const placeholdersNumbers = {
      'ru': "+ 7 (123) 123-12-23",
      'cn': '+86 139 1234 5678',
      'us': '+1 (305) 555-1234'
    }

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement>(
      ref,
      () => innerRef.current as HTMLInputElement
    );


    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      if (inputValue === '') {
        e.target.value = '';
        return;
      } 
      
      const masked = formatPhoneMask(inputValue, defaultCountry)
      
      e.target.value = masked
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: masked },
        currentTarget: { ...e.target, value: masked }
      } as ChangeEvent<HTMLInputElement>;
      
      onChange?.(syntheticEvent)
    };

    const renderFlag = (country: string, isDisabled: boolean) => {
      switch(country){
        case 'ru':
          return isDisabled 
            ? <RussianFlagDisabled className={styles.icon}/>
            : <RussianFlag className={styles.icon}/>
        case 'us': 
          return <RussianFlag className={styles.icon}/>
        case 'cn':
          return <ChinaFlag className={styles.icon}/>
      }
    }

    return (
          <InputText
            value={value}
            onChange={handleChanges}
            placeholder={placeholder ?? placeholdersNumbers[defaultCountry]}
            iconStart={renderFlag(defaultCountry, disabled)}
            iconStartBehavior="static"
            disabled={disabled}
            error={error}
            label={label}
            hintText={hintText}
            className={styles[className]}
            ref={ref}
            dataTestId={dataTestId}
            borderColor={borderColor}
            isTable={isTable}
          />
    );
  }
);

InputPhone.displayName = "InputPhone";

export default InputPhone;
