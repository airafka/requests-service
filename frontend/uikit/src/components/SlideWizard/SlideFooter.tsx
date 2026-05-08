import { Box } from "@mui/material";
import { FC } from "react";
import { BaseButton, CommonSize } from "../Button";
import { SlideFooterProps, StandardHandler } from "./types";
import { useSlideFooterStyles } from "./styles";

export const SlideFooter: FC<SlideFooterProps> = ({
  actions,
  additionalActions,
  defaultHandlers,
  isLoading = false,
}) => {
  const classes = useSlideFooterStyles();

  return (
    <Box className={classes.container}>
      {additionalActions && (
        <Box className={classes.buttonsGroup}>
          {additionalActions.map((action, index) => (
            <BaseButton
              key={index}
              onClick={
                typeof action.handler === "function"
                  ? action.handler
                  : defaultHandlers[action.handler as StandardHandler]
              }
              buttonType={action.buttonType}
              isLoad={isLoading}
            >
              {action.title}
            </BaseButton>
          ))}
        </Box>
      )}

      <Box className={classes.buttonsGroup}>
        {actions.map((action, index) => (
          <BaseButton
            key={index}
            onClick={
              typeof action.handler === "function"
                ? action.handler
                : defaultHandlers[action.handler as StandardHandler]
            }
            buttonType={action.buttonType}
            isLoad={isLoading}
            isDisabled={action.isDisabled}
          >
            {action.title}
          </BaseButton>
        ))}
      </Box>
    </Box>
  );
};

