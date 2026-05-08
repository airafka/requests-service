import { Theme } from "@mui/material";
import { createUseStyles } from "../../../hooks/createUseStyles";

export const useStyles = createUseStyles((theme: Theme) => ({
    headerBlock: (props: { noHeaderMargin?: boolean }) => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "40px",
        marginBottom: props.noHeaderMargin ? 0 : 16,
    }),
    headerTitle: {
        display: "flex",
        fontSize: "24px",
        fontWeight: 600,
        color: theme.colors.black.black20,
        margin: 0,
        padding: 0,
    },
    headerButtons: {
        display: "flex",
        flexDirection: "row",
        gap: "8px",
    },
    filterList: {
        display: "flex",
        flexDirection: "row",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        overflow: "hidden",
    },
}));
