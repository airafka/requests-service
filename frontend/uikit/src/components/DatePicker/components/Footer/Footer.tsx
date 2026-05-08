import { Box, useTheme } from "@mui/material";
import { BaseButton, ButtonType } from "../../../Button";
import { useFooterStyles } from "./useFooterStyles";

interface FooterProps {
  text: string;
  borderNone?: boolean;
  onClick?: () => void;
}

export const Footer = ({ onClick, text, borderNone }: FooterProps) => {
  const theme = useTheme();
  const styles = useFooterStyles({ theme, borderNone });

  return (
    <Box sx={styles.root}>
      <BaseButton buttonType={ButtonType.light} onClick={onClick}>
          {text}
      </BaseButton>
    </Box>
  );
};
