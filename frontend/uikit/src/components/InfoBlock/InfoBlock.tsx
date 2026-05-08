import { FC, useMemo } from "react";
import classNames from "classnames";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { FontWeight, TextLabel } from "../TextLabel";
import { IInfoBlock, InfoFieldItem } from "./types";
import { useStyles } from "./styles";
import { useIconStyles } from "../ITooltype/styles";
import { ITooltype } from "../ITooltype";
import { HelpInputIcon } from "../../icons";

export const InfoBlockTableRow = ({
  row: { name, value, label, isUpdated, tooltypeLabel },
  classes,
  hasTooltypeColumn,
}: {
  row: InfoFieldItem;
  classes: ReturnType<typeof useStyles>;
  hasTooltypeColumn: boolean;
}) => {
  const theme = useTheme();
  const iconClasses = useIconStyles({ theme });
  return (
    <TableRow key={name} className={isUpdated ? classes.updated : ""}>
      <TableCell className={classNames(classes.cell, classes.label)}>
        <TextLabel text={label} size={14} weight={FontWeight.Regular} />
      </TableCell>
      <TableCell className={classNames(classes.cell, classes.value)}>
        <Typography component="span" fontWeight={500} fontSize={14}>
          {value instanceof Date
            ? value.toLocaleDateString()
            : (value?.toString().trim().length ?? 0) > 0
            ? value
            : "-"}
        </Typography>
      </TableCell>
      {hasTooltypeColumn && (
        <TableCell className={classNames(classes.cell, classes.tooltype)}>
          {tooltypeLabel && (
            <Box className={classes.tooltypeContainer}>
              <ITooltype
                id={`info-block-tooltype-${name}`}
                item={<HelpInputIcon className={iconClasses.icon} />}
                label={tooltypeLabel}
                isTranslate={false}
              />
            </Box>
          )}
        </TableCell>
      )}
    </TableRow>
  );
};
export const InfoBlock: FC<IInfoBlock> = ({ name, fields }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const segments = useMemo(() => {
    const result: Array<{ hasTooltype: boolean; rows: InfoFieldItem[] }> = [];

    for (const row of fields) {
      const hasTooltype = Boolean(row.tooltypeLabel);
      const last = result[result.length - 1];
      if (!last || last.hasTooltype !== hasTooltype) {
        result.push({ hasTooltype, rows: [row] });
      } else {
        last.rows.push(row);
      }
    }

    return result;
  }, [fields]);

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.name}>{name}</Typography>
      <Box className={classes.tables}>
        {segments.map((segment, idx) => (
          <Table
            key={`${segment.hasTooltype ? "t" : "n"}-${segment.rows[0]?.name ?? idx}`}
            className={classNames(
              classes.table,
              segment.hasTooltype ? classes.tableWithTooltype : classes.tableNoTooltype
            )}
          >
            <TableBody>
              {segment.rows.map((row) => (
                <InfoBlockTableRow
                  key={row.name}
                  row={row}
                  classes={classes}
                  hasTooltypeColumn={segment.hasTooltype}
                />
              ))}
            </TableBody>
          </Table>
        ))}
      </Box>
    </Box>
  );
};
