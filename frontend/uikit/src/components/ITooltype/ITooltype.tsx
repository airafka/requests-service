import { FC, MouseEvent, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Popover, Typography, useTheme } from "@mui/material";
import { ITooltypeProps, TooltipType } from "./types";
import { useStyles } from "./styles";
import { resolveFlip } from "./resolveFlip";

const borderForm: Record<string, string> = {
  topright: "tooltipTopRight",
  bottomright: "tooltipBottomRight",
  topleft: "tooltipTopLeft",
  bottomleft: "tooltipBottomLeft",
};

const DEFAULT_TOOLTIP_TYPE: TooltipType = {
  anchor: { vertical: "bottom", horizontal: "left" },
  transform: { vertical: "top", horizontal: "left" },
};

export const ITooltype: FC<ITooltypeProps> = ({
  id,
  item,
  children,
  label,
  isTranslate = true,
  isDisabled,
  tooltipType = DEFAULT_TOOLTIP_TYPE,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [paperEl, setPaperEl] = useState<HTMLDivElement | null>(null);

  const [resolvedType, setResolvedType] = useState<TooltipType>(tooltipType);

  const [isReady, setIsReady] = useState(false);

  const open = Boolean(anchorEl);

  const tooltipClass = useMemo(() => {
    const key =
      resolvedType.transform.vertical + resolvedType.transform.horizontal;
    return classes[borderForm[key]];
  }, [resolvedType, classes]);

  const handleEnter = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setResolvedType(tooltipType);
    setIsReady(false);
  };

  const handleLeave = () => {
    setAnchorEl(null);
    setIsReady(false);
  };

  useLayoutEffect(() => {
    if (!open) return;
    if (isReady) return;
    if (!anchorEl || !paperEl) return;

    const next = resolveFlip(tooltipType, anchorEl, paperEl);
    setResolvedType(next);
    setIsReady(true);
  }, [open, isReady, anchorEl, paperEl, tooltipType]);

  return (
    <>
      <Box
        aria-owns={open ? id : undefined}
        aria-haspopup="true"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={classes.iconWrapper}
      >
        {item || children}
      </Box>

      {!isDisabled && label && (
        <Popover
          id={id}
          sx={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={resolvedType.anchor}
          transformOrigin={{
            vertical: resolvedType.transform.vertical,
            horizontal: resolvedType.transform.horizontal,
          }}
          onClose={handleLeave}
          disableRestoreFocus
          slotProps={{
            paper: {
              ref: (node) => setPaperEl(node as HTMLDivElement | null),
              className: `${classes.box} ${tooltipClass}`,
              style: { visibility: isReady ? "visible" : "hidden" },
            },
          }}
        >
          <Box>
            <Typography className={classes.font} whiteSpace={"pre-line"}>
              {isTranslate && typeof label === "string" ? t(label) : label}
            </Typography>
          </Box>
        </Popover>
      )}
    </>
  );
};

export default ITooltype;
