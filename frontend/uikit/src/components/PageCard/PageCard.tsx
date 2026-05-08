import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import { PageCardProps } from "./types";
import { useStyles } from "./styles";

const PageCard: FC<PageCardProps> = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return <Box className={classes.card}>{children}</Box>;
};

export default PageCard;
