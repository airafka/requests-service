import { SxProps, Theme } from "@mui/material";
import { createUseStyles } from "@/hooks";
import { DropDownProps, useDropDownBaseStyles, useDropDownInlineStyles } from "../styles";
import { TokenReturnType, useToken } from '@/theme'

export const useInlineStyles = (theme: Theme) => {
  const { paper: dropDownPaper } = useDropDownInlineStyles(8);

  const paper: SxProps<Theme> = {
    ...dropDownPaper,
    maxWidth: "none",
    marginTop: "4px",
  };
  const placeholder = {
    color: theme.colors.gray.lightGrey,
  };
  const filterPlaceholder = {
    color: theme.colors.black.black20,
  };

  return { paper, placeholder, filterPlaceholder };
};

export const useSelectClasses = (props: DropDownProps) => {
  const baseStyles = useDropDownBaseStyles(props)

  return createUseStyles({
    input: {
      ...baseStyles.default,
      ...(props.isDisable ? {} : {
        "&:hover": {
          ...baseStyles.hover,
        },
      }),
      "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
        ...baseStyles.focus,
        "& #placeholder": {
          opacity: 0
        }
      },
      "&.Mui-error": {
        "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
          ...baseStyles.errorFocus,
        },
      },
      "& fieldset": {
        border: "none",
      },
      "&.MuiSelect-root": {
        ...baseStyles.input,
        position: "relative",
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "0",
        },
        "& .MuiInputAdornment-root": {
          gap: useToken("dropdown_base/gap/name4"),
        },
        "& .MuiIconButton-root": {
          ...baseStyles.iconButton,
        },
      },
    },
    li: {
      ...baseStyles.listItem,
      "&[aria-selected='true']": {
        backgroundColor: `${useToken("dropdown_list_items/color/fill/default")} !important`,
        "&:hover": {
          backgroundColor: `${useToken("dropdown_list_items/color/fill/hovered")} !important`
        },
      },
      "& svg": {
        marginLeft: "auto",
        flexShrink: 0,
      },
    },
    paper: {
      ...baseStyles.paper,
      marginTop: "4px",
      "& ul": {
        paddingTop: 0,
        paddingBottom: 0,
      }
    },
    badgeContainer: {
      ...baseStyles.badgeContainer,
    },
    badgeBox: {
      ...baseStyles.badgeBox,
    },
    badgeWrapper: {
      WebkitTextFillColor: "currentColor",
    },
    inputArea: {
      ...baseStyles.inputArea,
    },
    placeholder: {
      ...baseStyles.placeholder,
    },
    selectBoolItem: {
      height: useToken("dropdown_list_items/size/width", TokenReturnType.PX),
      backgroundColor: useToken("dropdown_list_items/color/fill/default"),
      "&:hover": {
        backgroundColor: `${useToken("dropdown_list_items/color/fill/hovered")} !important`,
      },
      borderRadius: 1,
    },
    textOverflow: {
      ...baseStyles.textOverflow,
    }
  })
}
