import { Box, Typography } from "@mui/material";
import { Badge, colorBadge } from "../Badge";
import { useHeaderStyles } from "./styles";

interface SlideHeaderProps {
  title: string;
  subtitle?: string;
}

const SlideHeader = ({ title, subtitle }: SlideHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.headerContent}>
        <Typography className={classes.title}>{title}</Typography>
        {subtitle && (
          <Badge
            color={colorBadge.gray}
            text={subtitle}
            customClassName={classes.badge}
          />
        )}
      </Box>
    </Box>
  );
};

export default SlideHeader;

