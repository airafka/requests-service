import { Box, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FC } from "react";
import { type PageProps } from "./types";
import { useStyles } from "./styles";

export const Page: FC<PageProps> = observer(
    ({ children, filterList, headerButtons, noHeaderMargin, noTitle = false, store }: PageProps) => {
        const theme = useTheme();
        const { pageTitle: title } = store;
        const classes = useStyles({ theme, noHeaderMargin });

        return (
            <>
                {!noTitle && (
                    <Box className={classes.headerBlock}>
                        <Box component={"h2"} className={classes.headerTitle}>
                            {title}
                        </Box>
                        {headerButtons ? (
                            <Box className={classes.headerButtons}>{headerButtons}</Box>
                        ) : (
                            ""
                        )}
                    </Box>
                )}
                {filterList ? <Box className={classes.filterList}>{filterList}</Box> : ""}
                {children ? <Box className={classes.content}>{children}</Box> : ""}
            </>
        );
    }
);
