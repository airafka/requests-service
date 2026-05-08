import {
  SxProps,
  Theme,
} from "@mui/material";
import { useSuperLightBorderStyles } from "@/hooks";

interface StyleProps {
  theme: Theme;
  error?: boolean;
  open?: boolean;
  disabled?: boolean;
}

export const useInputRangeStyles = ({
  theme,
  error,
  open,
  disabled,
}: StyleProps): {
  [key: string]: SxProps<Theme>
} => {
  const superLightBorderStyles = useSuperLightBorderStyles(theme);

  const wrapper: SxProps<Theme> = {
    ...superLightBorderStyles.default,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "40px",
    padding: "0 8px",
    cursor: "pointer",
    "&:hover": {
      ...superLightBorderStyles.hover,
    },
    ...(open && {
      ...superLightBorderStyles.focus,
    }),
    ...(error && {
      ...superLightBorderStyles.error,
      "&:hover": {
        ...superLightBorderStyles.errorHover,
      },
      ...(open && {
        ...superLightBorderStyles.errorFocus,
      }),
    }),
    ...(disabled && {
      ...superLightBorderStyles.disabled,
    }),
  };

  const rangeControls: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingLeft: "8px",
    "& svg": {
      flexShrink: "0",
      width: "16px",
      height: "16px",
      "& path": {
        stroke: theme.colors.gray.grayIron,
        transition: "stroke 0.3s",
        ...(disabled && {
            stroke: theme.colors.gray.lightGrey,
        }),
      },
      "&.chevronIcon": {
        rotate: open ? "180deg" : "0deg",
        
        "& path": {
          ...(error && !disabled && {
            stroke: theme.colors.error,
          }),
        },
      },
    },
  };

  return {
    wrapper,
    rangeControls,
  };
};
