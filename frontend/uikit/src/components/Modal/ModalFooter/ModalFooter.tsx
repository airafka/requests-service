import { Box } from "@mui/material";
import { CustomButtonProps } from "../../Button/BaseButton/types";
import { BaseButton } from "../../Button/BaseButton";
import { useStyles } from "./styles";
import { CommonSize } from "../../../types/CommonSize";

export type ModalFooterButtonsProps = {
  onClick: CustomButtonProps["onClick"];
  children: CustomButtonProps["children"];
  buttonType?: CustomButtonProps["buttonType"];
  buttonAction?: CustomButtonProps["ButtonAction"];
  isDisabled?: CustomButtonProps["isDisabled"];
  isLoad?: CustomButtonProps["isLoad"];
  size?: CommonSize;
};

interface ModalFooterProps {
  footerButtons: ModalFooterButtonsProps[];
}

export const ModalFooter = ({ footerButtons }: ModalFooterProps) => {
  const classes = useStyles();
  if (!footerButtons || !footerButtons.length) {
    return <></>;
  }

  return (
    <Box className={classes.footer}>
      {footerButtons.map((buttonProps, index) => (
        <BaseButton
          key={index}
          onClick={buttonProps.onClick}
          buttonType={buttonProps.buttonType}
          ButtonAction={buttonProps.buttonAction || "button"}
          isDisabled={buttonProps.isDisabled}
          isLoad={buttonProps.isLoad}
        >
          {buttonProps.children || ""}
        </BaseButton>
      ))}
    </Box>
  );
};
