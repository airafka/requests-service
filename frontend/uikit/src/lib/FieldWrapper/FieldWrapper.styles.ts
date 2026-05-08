// import { createUseStyles } from "@alabuga/uikit";
import { useFont, useToken } from "@/theme";
import { createUseStyles } from "../../hooks/createUseStyles";
import { Theme } from "@mui/material";

interface StyleProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  hasValue?: boolean;
}

export const useFieldWrapperStyles = createUseStyles((theme: Theme) => {
  return {
    root: ({ hasValue, isInvalid } : StyleProps) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
      width: "100%",
      "& label": {
        color: hasValue ? useToken("input/color/text/label/filled") : useToken("input/color/text/label/default"),
      },
      "&:has(input:hover):not(:has(input:disabled)) label": {
        color: useToken("input/color/text/label/hovered"), 
      },
      "&:has(input:focus):not(:has(input:disabled)) label": {
        color: useToken("input/color/text/label/focused"), 
      },
      "&:has(input:disabled) label": {
        color: useToken("input/color/text/label/disabled"), 
      },
      "&:has(input:hover):not(:has(input:disabled)) p": {
        color: isInvalid ? useToken("input/color/text/hint/error")  : useToken("input/color/text/hint/hovered"),
      },
      "&:has(input:focus):not(:has(input:disabled)) p": {
        color: isInvalid ? useToken("input/color/text/hint/error") : useToken("input/color/text/hint/focused"),
      },
      "&:has(input:disabled) p": {
        color: useToken("input/color/text/hint/disabled"),
      },
    }),
    label: ({ isDisabled }: StyleProps) => ({
      font: useFont({
        size: "typography/paragraph/p3/font_size",
        weight: "typography/paragraph/p3/font_weight",
        family: "typography/font_family",
        }),
      transition: "color 0.3s",
      ...(isDisabled && {
        color: theme.colors.gray.lightGrey,
      }),
    }),
    hint: ({ isDisabled, isInvalid, hasValue }: StyleProps) => ({
      margin: "0",
      color: hasValue ? useToken("input/color/text/hint/filled") : useToken("input/color/text/hint/default"),
      transition: "color 0.3s",
      font: useFont({
        size: "typography/paragraph/p4/font_size",
        weight: "typography/paragraph/p4/font_weight",
        family: "typography/font_family",
      }),
      ...(isInvalid &&
        !isDisabled && {
          color: useToken("input/color/text/hint/error"),
        }),
    }),
  };
});
