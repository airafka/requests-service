import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";

export const useInlineHelpStyles = createUseStyles((theme: Theme) => {
  return {
    tooltip: {
      background: theme.colors.secondary[200],
      color: theme.colors.black.main,
      fontSize: 16,
      boxShadow: "2px 2px 5px 2px rgba(0, 0, 0, 0.2)",
      textAlign: "justify",
      padding: 2,
    },
  };
});
