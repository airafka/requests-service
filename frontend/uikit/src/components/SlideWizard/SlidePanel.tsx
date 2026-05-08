import { Box } from "@mui/material";
import { SlidePanelProps } from "./types";
import { useSlidePanelStyles } from "./styles";

const SlidePanel = ({ value, index, Component }: SlidePanelProps) => {
  const classes = useSlidePanelStyles(index - value);

  return (
    <Box
      role="slidepanel"
      aria-labelledby={`slide-${index}`}
      id={`slidepanel-${index}`}
      className={classes.panel}
    >
      <Box className={classes.panelContent}>
        <Component />
      </Box>
    </Box>
  );
};

export default SlidePanel;
