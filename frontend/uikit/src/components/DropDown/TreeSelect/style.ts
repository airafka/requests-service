import { createUseStyles } from "@/hooks";
import { BorderStyle, TokenReturnType, useBorder, useBoxShadow, useFont, useSpacing, useToken } from '@/theme'
import { DropDownProps, useDropDownBaseStyles } from '@/components/DropDown/styles'

export const useTreeSelectStyles = (props: DropDownProps) => {
  const baseStyles = useDropDownBaseStyles(props)

  return  createUseStyles({
    root: {
        ...baseStyles.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...(props.isDisable ? {} : {
          "&:hover": {
            ...baseStyles.hover
          },
        }),
        "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
          ...baseStyles.focus,
          "& input::placeholder":{
            opacity: 0,
          }
        },
        "&.Mui-error": {
          "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
            ...baseStyles.errorFocus,
          },
        },
    },
    inputArea: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    input: {
      border: "none",
      outline: "none",
      background: "transparent",
      width: "100%",
      ...baseStyles.input,
      padding: 0,
      "&::placeholder": {
        ...baseStyles.placeholder,
      },
    },
    selectedText:{
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      gap: useToken("dropdown_base/gap/name4"),
      margin: "0"
    },
    popoverContent: {
      display: "flex",
      flexDirection: "column",
      maxHeight: 320,
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: useToken("dropdown_list_items/gap/name8"),
      minHeight: 36,
      paddingRight: useToken("dropdown_list_items/gap/name8"),
      backgroundColor: useToken("dropdown_list_items/color/fill/default"),
      "&:hover": {
        backgroundColor: useToken("dropdown_list_items/color/fill/hovered"),
      }
    },
    chevronButton: {
      ...baseStyles.iconButton,
    },
    label: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      font: useFont({
        size: "typography/paragraph/p3/font_size",
        weight: "typography/paragraph/p3/font_weight",
        family: "typography/font_family",
      }),
      lineHeight: useToken("typography/paragraph/p3/line_height", TokenReturnType.PX),
      letterSpacing: useToken("typography/paragraph/p3/letter_spacing", TokenReturnType.PX),
      color: useToken("dropdown_list_items/color/text/hover"),
    },
  })
}
