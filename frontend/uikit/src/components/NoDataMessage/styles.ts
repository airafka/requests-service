import { createUseStyles } from "../../hooks/createUseStyles";

export const useNoDataMessageStyles = createUseStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "16px",
    },
}));
