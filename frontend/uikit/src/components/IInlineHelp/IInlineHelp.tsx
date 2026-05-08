import { FC } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";
import { useInlineHelpStyles } from "./styles";
import { IInlineHelpPropsType } from "./types";

const IInlineHelp: FC<IInlineHelpPropsType> = ({ describe }) => {
  const classes = useInlineHelpStyles();

  return (
    <Tooltip
      title={describe}
      placement={"right-end"}
      arrow
      color={"black"}
      componentsProps={{
        tooltip: {
          className: classes.tooltip,
        },
      }}
    >
      <HelpOutlineIcon />
    </Tooltip>
  );
};

export default IInlineHelp;
