import { createUseStyles } from "../../hooks/createUseStyles";
import { Theme } from "@mui/material";

export const useAutocompleteMultiStyles = createUseStyles((theme: Theme) => ({
    popover: {
        "& .MuiPaper-root": {
            overflow: "hidden",
            border: `1px solid ${theme.colors.gray.superLightGray}`,
            borderRadius: "5px",
            boxShadow: "0px 12px 16px -4px #10182814, 0px 4px 6px -2px #10182808 !important",
        },
    },
    popoverContent: {
        maxHeight: "216px",
        overflowY: "auto",
    },
    optionsList: {
        display: "flex",
        flexDirection: "column",
    },
    option: {
        display: "flex",
        gap: "10px",
        padding: "10px 16px",
        outline: "none",
        cursor: "pointer",
        transition: "0.2s",
        transitionProperty: "background-color",

        "&:hover, &:focus-within": {
            backgroundColor: theme.colors.secondary.variant,
        },
    },
    listItemText: {
        margin: 0,
    },
    listItemTextProps: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "16px",
    },
    icon: {
        color: theme.colors.gray.grayIron,
    },
}));
