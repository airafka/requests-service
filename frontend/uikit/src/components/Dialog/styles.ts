import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";

interface StyleProps {
    theme: Theme;
    width?: number;
    height?: number;
}

const toSize = (value?: number) => (value !== undefined ? `${value}px` : undefined);

export const useStyles = createUseStyles({
    modalWindow: {},
    container: ({ theme, width, height }: StyleProps) => ({
        minWidth: toSize(width) ?? "588px",
        minHeight: toSize(height) ?? "146px",
        width: toSize(width),
        height: toSize(height),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 16px 16px 24px",
        color: theme?.colors?.black?.black20,
        fontWeight: 500,
    }),
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    closeButton: ({ theme }: StyleProps) => ({
        minWidth: "24px",
        maxHeight: "24px",
        padding: 0,
        border: `0.5px solid ${theme?.colors?.gray?.superLightGray}`,
        borderRadius: 0,
        boxShadow: `0px 1px 2px 0px ${theme?.colors?.gray?.smokyGrey}`,
    }),
    dialogTitle: {
        fontSize: 14,
        fontWeight: 500,
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: ({ theme }: StyleProps) => ({
        "& path": {
            stroke: theme?.colors?.iron,
        },
    }),
    textContent: {
        marginLeft: 24,
    },
    dialogButtons: ({ theme }: StyleProps) => ({
        padding: 0,
        "& button": {
            fontSize: 14,
            boxShadow: `0 1px 2px 0 ${theme?.colors?.gray?.smokyGrey}`,
            border: `1px solid ${theme?.colors?.gray?.superLightGray}`,
        },
        "& button:not(:last-child)": {
            backgroundColor: theme?.colors?.white,
            color: theme?.colors?.primary?.main,
            boxShadow: `0 1px 2px 0 ${theme?.colors?.gray?.smokyGrey}`,
            border: `1px solid ${theme?.colors?.gray?.superLightGray}`,
        },
    }),
});
