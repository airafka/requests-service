import { createUseStyles} from "@/hooks";
import { useSpacing, useToken } from '@/theme'
import { DropDownProps, useDropDownBaseStyles } from '@/components/DropDown/styles'

const OPTION_HEIGHT = 36;

export const useAutocompleteMultiStyles = (props: DropDownProps) => {
  const baseStyles = useDropDownBaseStyles(props)

  return createUseStyles({
    root: {
        display: "flex",
        alignItems: "center",
        gap: useToken("dropdown_base/gap/name8"),
        justifyContent: "space-between",
        ...baseStyles.default,
        ...(props.isDisable ? {} : {
          "&:hover": {
            ...baseStyles.hover,
          }
        }),
        "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
          ...baseStyles.focus,
        },
        "&.Mui-error": {
          "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
            ...baseStyles.errorFocus
          },
        },
        "& .MuiInputAdornment-root": {
          display: "flex",
          alignItems: "center",
          margin: "0",
        },
        "& .MuiIconButton-root": {
          ...baseStyles.iconButton
        },
    },
    placeholder: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: 14,
      alignSelf: "center",
    },
    badgeContainer: {
      ...baseStyles.badgeContainer
    },
    badgeBox: {
      ...baseStyles.badgeBox
    },
    autocompleteInputArea: {
      ...baseStyles.inputArea
    },
    iconsContainer: {
      gap: useToken("dropdown_base/gap/name4"),
    },
    popover: {
      ...baseStyles.paper,
      overflow: "hidden",
      "& .MuiPaper-root": {
        maxWidth: "none",
      },
    },
    popoverContent: {
      display: "flex",
      flexDirection: "column",
    },
    optionsContainer: (props: {overflowOptionsCount: number}) => ({
      // по умолчанию 8 опций до появления скролла
      maxHeight: `${OPTION_HEIGHT * (props.overflowOptionsCount || 8)}px`,
      overflowY: "auto",
      msOverflowStyle: "none",
      scrollbarWidth: "none",

      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    listBox: {
      border: "none",
      outline: "none",
      background: "transparent",
      flex: "1 1 auto",
      minWidth: 60,
      ...baseStyles.input,
      padding: 0,
      "&:focus, &:focus-within, &.Mui-focused, &.Mui-expanded": {
        "&::placeholder": {
          opacity: 0,
        }
      },
      "&::placeholder": {
        ...baseStyles.placeholder,
      },
    },
    optionsList: {
      display: "flex",
      flexDirection: "column",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      ...baseStyles.listItem,
      "& .MuiListItemText-root": {
        margin: "0",
      },
      "& .MuiTypography-body1": {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        fontFamily: 'inherit',
      },
    },
    searchWrapper: {
      padding: useSpacing({
        vertical: useToken("search/gap/name12"),
        horizontal: useToken("search/gap/name16"),
      }),
    },
    searchIcon: {
      color: useToken("search/color/icon/filled"),
    },
    localOptions: {
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0,
    },
    pickedOptionsWrapper: {
      position: "relative",
      borderLeft: `1px solid ${useToken("shadow/color/gray")}`,
    },
  })
}
