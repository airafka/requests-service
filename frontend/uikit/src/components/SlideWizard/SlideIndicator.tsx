import classNames from "classnames";
import { Box, Typography, useTheme } from "@mui/material";
import { SlideIndicatorProps } from "./types";
import {
  CircleIcon,
  CheckCircleIcon,
  RadioButtonUncheckedIcon,
  PreCheckIcon,
} from "../../icons";
import { useConnectorLineStyles, useSlideIndicatorStyles } from "./styles";

const SlideIcon = ({
  isActive,
  isNext,
  isCompleted,
}: {
  isActive: boolean;
  isNext: boolean;
  isCompleted: boolean;
}) => {
  const theme = useTheme();

  if (isCompleted) {
    return (
      <CheckCircleIcon
        style={{ color: theme.colors?.primary?.main }}
        width={20}
        height={20}
      />
    );
  }

  if (isActive) {
    return (
      <CircleIcon
        style={{ color: theme.colors?.primary?.main }}
        width={20}
        height={20}
      />
    );
  }

  if (isNext) {
    return (
      <PreCheckIcon
        style={{ color: theme.colors?.primary?.main }}
        width={20}
        height={20}
      />
    );
  }

  return (
    <RadioButtonUncheckedIcon
      style={{ color: theme.colors?.iron }}
      width={20}
      height={20}
    />
  );
};

const ConnectorLine = ({
  direction,
  isActive,
}: {
  direction: "top" | "bottom";
  isActive: boolean;
}) => {
  const classes = useConnectorLineStyles(direction);

  return (
    <Box
      className={classNames(
        classes.line,
        isActive ? classes.line_active : classes.line_default
      )}
    />
  );
};

const SlideIndicator = ({
  frames,
  currentFrame,
  onFrameClick,
}: SlideIndicatorProps) => {
  const classes = useSlideIndicatorStyles();

  const ItemComponent = onFrameClick ? "button" : Box;

  return (
    <Box className={classes.container}>
      {frames.map((frame, index) => {
        const isActive = index === currentFrame;
        const isNext = index === currentFrame + 1;
        const isCompleted = index < currentFrame;
        const isLast = index === frames.length - 1;

        return (
          <ItemComponent
            key={index}
            className={classNames(
              classes.iconContainer,
              onFrameClick && classes.iconContainer_clickable,
              isActive && classes.iconContainer_isActive
            )}
            tabIndex={onFrameClick && isActive ? -1 : undefined}
            onClick={onFrameClick ? () => onFrameClick(index) : undefined}
          >
            <Box className={classes.indicatorWrapper}>
              <Box className={classes.iconWrapper}>
                <SlideIcon
                  isActive={isActive}
                  isNext={isNext}
                  isCompleted={isCompleted}
                />
              </Box>

              {!isLast && (
                <ConnectorLine
                  direction="bottom"
                  isActive={isCompleted || isActive}
                />
              )}
            </Box>

            <Box className={classes.labelWrapper}>
              <Typography
                component="span"
                variant="body2"
                className={classes.labelText}
              >
                {frame.label}
              </Typography>
            </Box>
          </ItemComponent>
        );
      })}
    </Box>
  );
};

export default SlideIndicator;
