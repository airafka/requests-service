import { Theme } from "@mui/material";
import { createUseStyles } from "../../../hooks/createUseStyles";

export const useErrorPageStyles = createUseStyles((theme: Theme) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "60px",
        marginLeft: 110,
        marginTop: 124,
        marginBottom: 124,
    },
    imageContainer: {
        flexShrink: 0,
    },
    image: {
        width: "100%",
        maxWidth: 900,
        height: 620,
    },
    code: {
        color: theme.colors.primary.main,
        fontWeight: 600,
        fontSize: "64px",
        marginBottom: "16px",
    },
    title: {
        color: theme.colors.black.black20,
        fontWeight: 600,
        fontSize: "36px",
        marginBottom: "32px",
    },
    description: {
        color: theme.colors.black.black20,
        whiteSpace: "pre-line",
        fontWeight: 500,
        fontSize: "24px",
    },
}));
