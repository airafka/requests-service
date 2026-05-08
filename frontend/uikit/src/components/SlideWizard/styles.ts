import { createUseStyles } from "../../hooks/createUseStyles";
import { Theme } from "@mui/material";

export const useSlideWizardStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: theme?.colors?.primary?.white,
  },
  contentWrapper: {
    flex: 1,
    minHeight: 0,
  },
  slidePanelContainer: {
    position: "relative",
    height: "100%",
  },
  slidePanelWrapper: {
    position: "relative",
    height: "100%",
    flexGrow: "1 !important",
    overflow: "hidden",
    // компенсация отступа на panel + запас для тени фокуса слева
    margin: "-4px 0 0 -4px",
    paddingLeft: 4,
    paddingRight: 0,
  },
  indicatorContainer: {
    position: "sticky",
    alignSelf: "flex-start",
    zIndex: 1,
    marginLeft: "6px",
    borderLeft: `1px solid ${theme?.colors?.gray?.superLightGray}`,
    height: "100%",
    width: "157px",
    minWidth: "157px",
    maxWidth: "157px",
    paddingRight: 0,
  },
  indicatorWrapper: {
    maxHeight: "calc(100dvh - 200px)",
    overflow: "hidden",
    position: "relative",
    top: "25px",
    paddingLeft: "8px",
  },
}));

export const useSlidePanelStyles = createUseStyles({
  panel: (direction: number) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: "0 6px 0 4px",
    margin: 0,
    transform: `translateY(${direction * 100}%)`,
    transition: "transform 0.8s ease-in-out",
  }),
  panelContent: {
    // чтобы не зарезалась тени полей формы
    // из-за overflow
    "&::before, &::after": {
      content: "''",
      display: "block",
      height: "4px",
    },
  },
});

export const useHeaderStyles = createUseStyles((theme: Theme) => ({
  container: {
    paddingBottom: 16,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    // выравнивание заголовка по центру с кнопкой «закрыть»
    minHeight: "24px",
    display: "flex",
    alignItems: "center",
  },
  badge: {
    minHeight: "24px",
  },
}));

export const useSlideFooterStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  buttonsGroup: {
    display: "flex",
    gap: theme.spacing(1),
    "&:last-child": {
      marginLeft: "auto",
    },
  },
}));

const ICON_BOX = 20;
// Отступ между строками шагов
const INDICATORS_GAP = 4;
// Длина соединительной линии между кружками
const CONNECTOR_LINE_H = 24;
const LINE_W = "1px";
const STEP_LABEL_LINE_HEIGHT = 20;
const STEP_LABEL_MAX_LINES = 2;
const STEP_ROW_HEIGHT = STEP_LABEL_LINE_HEIGHT * STEP_LABEL_MAX_LINES; // 40px

export const useConnectorLineStyles = createUseStyles((theme: Theme) => ({
  line: (direction: string) => ({
    position: "absolute",
    left: "50%",
    ...(direction === "top" && {
      bottom: STEP_ROW_HEIGHT / 2 + ICON_BOX / 2,
    }),
    ...(direction === "bottom" && {
      top: STEP_ROW_HEIGHT / 2 + ICON_BOX / 2,
    }),
    width: 0,
    height: `${CONNECTOR_LINE_H}px`,
    transform: "none",
  }),
  line_default: {
    borderLeft: `${LINE_W} solid ${theme.colors?.iron}`,
  },
  line_active: {
    borderLeft: `${LINE_W} solid ${theme.colors?.primary?.main}`,
  },
}));

export const useSlideIndicatorStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
    paddingBottom: 0,
  },
  iconContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: `${STEP_ROW_HEIGHT}px`,
    marginBottom: INDICATORS_GAP,
    textAlign: "left",
    color: theme.colors?.iron,
    transition: "color 0.3s",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  iconContainer_clickable: {
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      color: theme.colors?.charcoal,
    },
  },
  iconContainer_isActive: {
    color: `${theme.colors?.charcoal} !important`,
    pointerEvents: "none",
  },
  indicatorWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: `${STEP_ROW_HEIGHT}px`,
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ICON_BOX,
    height: ICON_BOX,
    zIndex: 2,
    position: "relative",
  },
  labelWrapper: {
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    height: `${STEP_ROW_HEIGHT}px`,
    minHeight: `${STEP_ROW_HEIGHT}px`,
  },
  labelText: {
    fontWeight: 500,
    lineHeight: `${STEP_LABEL_LINE_HEIGHT}px`,
    maxHeight: `${STEP_ROW_HEIGHT}px`,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: STEP_LABEL_MAX_LINES,
  },
}));

export const useProgressTabsStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    width: "100%",
    gap: "8px",
    marginBottom: "16px",
    paddingInline: 0,
  },
  line: {
    flex: 1,
    height: "4px",
    borderRadius: "8px",
    backgroundColor: theme?.colors?.gray?.disabledF3,
    transition: "background-color 0.3s",
  },
  line_clickable: {
    position: "relative",
    padding: "0",
    border: "none",
    cursor: "pointer",
    // увеличение области нажатия
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "-4px",
    },
    "&:hover": {
      backgroundColor: theme?.colors?.primary?.main,
    },
  },
  line_isActive: {
    backgroundColor: theme?.colors?.primary?.main,
    pointerEvents: "none",
  },
}));
