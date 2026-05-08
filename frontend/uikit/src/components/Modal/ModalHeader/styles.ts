import { Theme } from "@mui/material";
// import { createUseStyles } from "@alabuga/uikit";
import { createUseStyles } from "../../../hooks/createUseStyles";
import { useFont } from "@/theme";

interface StyleProps {
  marginBottom?: number;
}

export const useStyles = createUseStyles((theme: Theme) => {
  return {
    title: (props: StyleProps) => ({
      font: useFont({
        size: "typography/heading/h3/font_size",
        weight: "typography/heading/h3/font_weight",
        family: "typography/font_family",
      }),
      minHeight: "24px",
      color: theme.colors.black.black20, //тут нужен токен
      marginBottom: props.marginBottom || "16px",
      display: "flex",
      alignItems: "center",
    }),
  };
});
