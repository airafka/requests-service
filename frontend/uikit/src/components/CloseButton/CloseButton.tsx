import { Box, useTheme } from "@mui/material";
import { CloseToggleIcon } from "../../icons";
import { ButtonIcon } from "../Button/ButtonIcon";
import { ButtonSize } from "../Button/ButtonIcon/types";
import { useStyles } from "./styles";
import { CloseButtonProps } from "./types";
import { t } from "i18next";
import { useId } from "react";
import { ITooltype } from "../ITooltype";

export const CloseButton = ({ onClick, top, right, dataTestId="close-button" }: CloseButtonProps) => {
  const theme = useTheme();
  const classes = useStyles(top, right, theme)();
  const tooltipText = t("Shared:close");
  const id = useId();

  return (
    <Box className={classes.position}>
      <ITooltype id={id} label={tooltipText} isTranslate={false}>
        <ButtonIcon
          className="closeButton"
          onClick={onClick}
          icon={<CloseToggleIcon width={20} height={20} />}
          size={ButtonSize.Small}
          dataTestId={dataTestId}
        />
      </ITooltype>
    </Box>
  );
};

export default CloseButton;
