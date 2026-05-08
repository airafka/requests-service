import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Page } from "../Page";
import type { ErrorPageProps } from "./types";
import { Theme, useTheme } from "@mui/material/styles";
import CaseLockImage from "../../../assets/caseLock.png";
import { useErrorPageStyles } from "./styles";

const DEFAULT_IMAGE = CaseLockImage;

export const ErrorPage = observer(
  ({ code, title, description, imageSrc, store }: ErrorPageProps) => {
    const theme = useTheme();
    const classes = useErrorPageStyles({ theme: theme as Theme });

    return (
      <Page store={store}>
        <Box className={classes.wrapper}>
          <Box className={classes.imageContainer}>
            <img
              src={imageSrc || DEFAULT_IMAGE}
              alt={title}
              className={classes.image}
            />
          </Box>
          <Box>
            {code ? (
              <Typography className={classes.code}>{code}</Typography>
            ) : null}
            <Typography className={classes.title}>{title}</Typography>
            {description ? (
              <Typography className={classes.description} paragraph>
                {description}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Page>
    );
  },
);
