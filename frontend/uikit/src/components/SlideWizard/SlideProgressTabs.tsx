import classNames from 'classnames';
import { Box } from "@mui/material";
import { SlideProgressTabsProps } from "./types";
import { useProgressTabsStyles } from "./styles";

const SlideProgressTabs = ({ steps, active, onFrameClick }: SlideProgressTabsProps) => {
  const classes = useProgressTabsStyles();

  const ItemComponent = onFrameClick ? 'button' : Box;

  return (
    <Box className={classes.container}>
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index === active;

        return (
          <ItemComponent
            key={index}
            className={classNames(
              classes.line,
              onFrameClick && classes.line_clickable,
              isActive && classes.line_isActive,
            )}
            tabIndex={onFrameClick && isActive ? -1 : undefined}
            onClick={onFrameClick ? () => onFrameClick(index) : undefined}
          />
        );
      })}
    </Box>
  );
};

export default SlideProgressTabs;

