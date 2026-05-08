import { useMemo } from "react";
import { useTheme } from "@mui/material";
import { getTextLabelStyles } from "./styles";
import { TextLabelProps } from "./types";

const formatLabelText = (text: string | undefined, withColon: boolean): string => {
  if (!text) return "";
  return withColon ? `${text}:` : text;
};

const TextLabel = ({
  size,
  weight,
  text,
  className = "",
  required,
  withColon = true,
  error = false,
}: TextLabelProps) => {
  const theme = useTheme();
  
  const classes = useMemo(
    () => getTextLabelStyles({ size, weight, theme, error })(),
    [size, weight, theme, error]
  );

  const labelText = useMemo(
    () => formatLabelText(text, withColon),
    [text, withColon]
  );

  return (
    <span className={`${classes.label} ${className}`.trim()}>
      {labelText}
      {required && <span className={classes.required}>*</span>}
    </span>
  );
};

TextLabel.displayName = "TextLabel";

export default TextLabel;
