import classNames from "classnames"
import { useTheme } from "@mui/material";

import type { FieldWrapperProps } from "./FieldWrapper.types"
import { useFieldWrapperStyles } from "./FieldWrapper.styles"

export const FieldWrapper = ({
  className,
  inputId,
  label,
  hint,
  isDisabled,
  isInvalid,
  style,
  hasValue,
  children
}: FieldWrapperProps) => {
  const theme = useTheme();
  const styles = useFieldWrapperStyles({ theme, isDisabled, isInvalid, hasValue });

  return <>
    <div
      className={classNames(className, styles.root)}
      style={style}
    >
      {
        label && <>
          {
            inputId ? <>
              <label
                className={styles.label}
                htmlFor={inputId}
              >
                {label}
              </label>
            </> : <>
              <span className={styles.label}>
                {label}
              </span>
            </>
          }
        </>
      }

      {children}

      {
        hint && <>
          <p className={styles.hint}>
            {hint}
          </p>
        </>
      }
    </div>
  </>
};
