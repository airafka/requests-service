import { Theme } from "@mui/material";
import { createUseStyles } from "../../hooks/createUseStyles";

export const useStyles = createUseStyles((theme: Theme) => {
  return {
    wrapper: {
      padding: "8px",
      border: `1px solid ${theme.colors.gray.superLightGray}`,
      borderRadius: "5px",
      boxShadow: `0px 1px 2px 0px ${theme.colors.gray.smokyGrey}`,
      "&:not(:last-child)": {
        marginBottom: "8px",
      },
    },
    name: {
      ...theme.typography.subtitle2,
      paddingBottom: "16px",
      color: theme.colors.black.black20,
    },
    tables: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      rowGap: "10px",
    },
    table: {
      borderCollapse: "collapse",
      "& tbody tr:not(:first-child) > td": {
        paddingTop: "10px",
      },
    },
    tableNoTooltype: {
      width: "100%",
    },
    tableWithTooltype: {
      display: "inline-table",
      width: "fit-content",
      maxWidth: "100%",
    },
    cell: {
      ...theme.typography.body2,
      paddingInline: 0,
      paddingBlock: 0,
      borderBottom: "none",
    },
    label: {
      width: "195px",
      padding: "0px 60px 0px 0px",
      color: theme.colors.black.black20,
      fontSize: "14px",
      boxSizing: "content-box",
      verticalAlign: "middle",
      "& span": {
        color: "inherit",
      },
    },
    value: {
      color: theme.colors.black.black20,
      fontSize: "14px",
      padding: "0px 20px 0px 0px",
      verticalAlign: "middle",
      "& .MuiTypography-root": {
        minWidth: 0,
        overflowWrap: "anywhere",
      },
    },
    tooltype: {
      width: "24px",
      padding: 0,
      verticalAlign: "middle",
    },
    tooltypeContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100%",
    },
    updated: {},
  };
});
