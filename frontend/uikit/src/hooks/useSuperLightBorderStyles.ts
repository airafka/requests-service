import { Theme } from "@mui/material";


export const useSuperLightBorderStyles = (theme: Theme) => {
    return {
        default: {
            color: theme.colors.black.black20,
            background: theme.surfaceColor,
            borderRadius: "5px",
            border: "1px solid",
            borderColor: theme.colors.gray.superLightGray,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}`,
            transitionProperty: "color, background, border-color, box-shadow",
            transitionDuration: "0.3s",
        },
        hover: {
            borderColor: theme.colors.primary.variant800,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}`,
        },
        focus: {
            outline: "none",
            borderColor: theme.colors.primary.variant800,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}, 0px 0px 0px 4px ${theme.colors.secondary.light20}`,
        },
        disabled: {
            color: theme.colors.gray.grayIron,
            background: theme.mainBackgroundColor,
            borderColor: theme.colors.gray.superLightGray,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}`,
            pointerEvents: "none",
        },
        error: {
            borderColor: theme.colors.error_1,
        },
        errorHover: {
            borderColor: theme.colors.error,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}, 0px 0px 0px 2px ${theme.colors.errorShadow}`,
        },
        errorFocus: {
            borderColor: theme.colors.error,
            boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}, 0px 0px 0px 4px ${theme.colors.errorShadow}`,
            outline: "none",
        },
        selected: {
            backgroundColor: theme.colors.primary.variant,
            boxShadow: "unset",
            "&:hover": {
                backgroundColor: theme.colors.primary.main,
                boxShadow: `0px 0px 0px 2px ${theme.colors.primary.light20}`,
            },
        },
    };
};
