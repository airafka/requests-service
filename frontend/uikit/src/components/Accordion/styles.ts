import { createUseStyles } from "../../hooks/createUseStyles";
import { accordionSummaryClasses, Theme } from "@mui/material";

export const useAccordionStyles = createUseStyles((theme: Theme) => ({
    root: {
        borderWidth: "0px 1px 2px 1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: "5px",

        "&.Mui-expanded": {
            borderColor: theme.colors.gray.superLightGray,
        },

        "&::before": {
            background: "none",
        },
    },

    title: {
        padding: "4px 8px !important",
        minHeight: "30px !important",
        fontSize: "14px",
        lineHeight: "16px",
        backgroundColor: theme.colors.gray.superLightGray,
        borderRadius: "5px",
        boxShadow: "none",

        [`& .${accordionSummaryClasses.content}`]: {
            margin: 0,
        },

        [`& .${accordionSummaryClasses.content}.${accordionSummaryClasses.expanded}`]: {
            margin: 0,
        },
    },

    content: {
        padding: "8px 16px",
    },
}));
