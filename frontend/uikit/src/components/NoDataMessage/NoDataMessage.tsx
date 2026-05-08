import { t } from "i18next";
import { Typography, useTheme } from "@mui/material";
import { EmptyBoxIcon } from "../../icons";
import type { NoDataMessageProps } from "./types";
import { useNoDataMessageStyles } from "./styles";

export const NoDataMessage = ({ isInvalid, customText }: NoDataMessageProps) => {
    const theme = useTheme();
    const classes = useNoDataMessageStyles();

    return (
        <Typography
            variant="body2"
            className={classes.root}
            color={(isInvalid ? theme.colors.error : theme.colors.gray.grayIron) || ""}>
            <EmptyBoxIcon color={isInvalid ? theme.colors.error : "#d8dde3"} />
            {customText || t("Shared:noData")}
        </Typography>
    );
};
