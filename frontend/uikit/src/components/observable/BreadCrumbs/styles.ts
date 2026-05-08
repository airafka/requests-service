import { Theme } from "@mui/material/styles";
import { createUseStyles } from "../../../hooks/createUseStyles";

export const useBreadCrumbsStyles = createUseStyles((theme: Theme) => {
  const color = theme.colors.iron;
  
  return {
    root: {
      ...theme.typography.body2,
      color: `${color} !important`,
      fontWeight: 400,
      "& .MuiBreadcrumbs-separator": {
        marginInline: "4px",
      },
      "& a": {
        color: theme?.colors?.fossil,
      },
    },
    link: {
      textDecoration: "none",
    },
    activeLink: {
      borderBottom: `1px solid ${color}`,
    },
  };
});
