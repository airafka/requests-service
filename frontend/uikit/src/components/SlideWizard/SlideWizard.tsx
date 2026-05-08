import { Box, Grid2 } from "@mui/material";
import { useCallback, useState } from "react";
import { SlideWizardProps } from "./types";
import SlidePanel from "./SlidePanel";
import SlideIndicator from "./SlideIndicator";
import { SlideFooter } from "./SlideFooter";
import { useSlideWizardStyles } from "./styles";
import SlideHeader from "./SlideHeader";
import SlideProgressTabs from "./SlideProgressTabs";

export const SlideWizard = ({
  frames,
  currentFrame,
  onFrameChange,
  title,
  subtitle,
  hasClickableIndicators,
}: SlideWizardProps) => {
  const classes = useSlideWizardStyles();
  const [isLoading, setIsLoading] = useState(false);

  const currentFrameConfig = frames[currentFrame];

  const goToPrevFrame = useCallback(() => {
    if (currentFrame > 0) {
      onFrameChange(currentFrame - 1);
    }
  }, [currentFrame, onFrameChange]);

  const goToNextFrame = useCallback(() => {
    if (currentFrame < frames.length - 1) {
      onFrameChange(currentFrame + 1);
    }
  }, [frames.length, currentFrame, onFrameChange]);

  const handleClickBack = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      goToPrevFrame();
    },
    [goToPrevFrame],
  );

  const handleClickSave = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      // Используем saveAndClose() если есть, иначе save()
      const saveMethod =
        currentFrameConfig?.saveAndClose || currentFrameConfig?.save;
      if (saveMethod) {
        setIsLoading(true);
        try {
          await saveMethod();
        } finally {
          setIsLoading(false);
        }
      }
    },
    [currentFrameConfig],
  );

  const handleClickNext = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();

      // Автосохранение при переходе "Далее" (если включено для текущего шага)
      if (currentFrameConfig?.autoSaveOnNext && currentFrameConfig?.save) {
        setIsLoading(true);
        try {
          await currentFrameConfig.save();
        } catch (error) {
          // Если save() выбросил ошибку, не переходим дальше
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }

      if (currentFrameConfig?.next) {
        setIsLoading(true);
        try {
          await currentFrameConfig.next(goToNextFrame);
        } catch (error) {
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      } else {
        goToNextFrame();
      }
    },
    [currentFrameConfig, goToNextFrame],
  );

  const handleClickDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();

      if (currentFrameConfig?.delete) {
        setIsLoading(true);
        try {
          await currentFrameConfig.delete();
        } catch (error) {
          setIsLoading(false);
          return;
        } finally {
          setIsLoading(false);
        }
      }
    },
    [currentFrameConfig],
  );

  const handleClickFrame = useCallback(
    async (index: number) => {
      if (index !== currentFrame) {
        if (currentFrameConfig?.clickFrame) {
          setIsLoading(true);
          try {
            await currentFrameConfig.clickFrame(index, currentFrame, () =>
              onFrameChange(index),
            );
          } catch (error) {
            setIsLoading(false);
            return;
          } finally {
            setIsLoading(false);
          }
        } else {
          onFrameChange(index);
        }
      }
    },
    [currentFrameConfig, currentFrame, onFrameChange],
  );

  const defaultHandlers = {
    prev: handleClickBack,
    save: handleClickSave,
    saveAndClose: handleClickSave,
    next: handleClickNext,
    delete: handleClickDelete,
  };

  return (
    <Box className={classes.container}>
      {title && <SlideHeader title={title} subtitle={subtitle} />}
      <SlideProgressTabs
        steps={frames.length}
        active={currentFrame}
        onFrameClick={hasClickableIndicators ? handleClickFrame : undefined}
      />
      <Box className={classes.contentWrapper}>
        <Box className={classes.slidePanelContainer}>
          <Grid2 container spacing={0} columnSpacing={0} height="100%">
            <Grid2 size={9} className={classes.slidePanelWrapper}>
              {frames.map((frame, index) => (
                <SlidePanel
                  key={index}
                  value={currentFrame}
                  index={index}
                  Component={frame.component}
                />
              ))}
            </Grid2>

            <Grid2 size={3} className={classes.indicatorContainer}>
              <Box className={classes.indicatorWrapper}>
                <SlideIndicator
                  frames={frames}
                  currentFrame={currentFrame}
                  onFrameClick={
                    hasClickableIndicators ? handleClickFrame : undefined
                  }
                />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <SlideFooter
        actions={currentFrameConfig?.actions || []}
        additionalActions={currentFrameConfig?.additionalActions}
        defaultHandlers={defaultHandlers}
        isLoading={isLoading}
      />
    </Box>
  );
};
