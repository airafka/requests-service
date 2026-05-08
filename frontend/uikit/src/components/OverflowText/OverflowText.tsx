import classNames from "classnames";
import { useId, useState, useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { ITooltype } from "@/components/ITooltype";
import type { OverflowTextProps } from "./types";
import { useOverflowTextStyles } from "./styles";

export const OverflowText = ({
  className,
  tooltipText,
  dependencies,
  children,
  tooltipType
}: OverflowTextProps) => {
  const classes = useOverflowTextStyles();

  const id = useId();

  const [hasOverflow, setHasOverflow] = useState(false);

  const rootRef = useRef<HTMLTableCellElement>(null);
  const measurerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setHasOverflow(
      measurerRef.current !== null &&
        rootRef.current !== null &&
        measurerRef.current.getBoundingClientRect().width >
          rootRef.current.getBoundingClientRect().width,
    );
  }, [dependencies]);

  return (
    <Box className={classNames(className, classes.root)} ref={rootRef}>
      <Box className={classes.measurer} ref={measurerRef}>
        {children}
      </Box>

      {hasOverflow ? (
        <>
          <ITooltype
            id={id}
            label={tooltipText || children}
            isTranslate={false}
            tooltipType={tooltipType}
          >
            <Box className={classes.text}>{children}</Box>
          </ITooltype>
        </>
      ) : (
        <>
          <Box className={classes.text}>{children}</Box>
        </>
      )}
    </Box>
  );
};
