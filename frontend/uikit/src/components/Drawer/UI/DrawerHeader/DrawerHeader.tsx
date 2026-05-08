import { Typography, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { ReactNode } from "react";

export const DrawerTitle = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return <Typography className={classes.title}>{children}</Typography>;
};
