import { Typography, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { ReactNode } from "react";

interface ModalHeaderProps {
  children: ReactNode;
  marginBottom?: number;
}

export const ModalHeader = ({ children, marginBottom }: ModalHeaderProps) => {
  const theme = useTheme();
  const classes = useStyles({ theme, marginBottom });
  return <Typography className={classes.title}>{children}</Typography>;
};
