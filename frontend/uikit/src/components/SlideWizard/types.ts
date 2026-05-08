import React from "react";
import { ButtonType } from "../Button/BaseButton";

// Стандартные обработчики действий
export type StandardHandler = "prev" | "save" | "saveAndClose" | "next" | "delete";

// Действие (кнопка) в футере
export interface Action {
  title: string;
  position: "left" | "right";
  buttonType: ButtonType;
  handler:
    | StandardHandler
    | ((e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>);
  isDisabled?: boolean;
}

// Фрейм (слайд) визарда
export interface Frame {
  label: string;
  component: React.ComponentType;
  save?: () => Promise<void>; // Сохранение без закрытия формы (для автосохранения при "Далее")
  saveAndClose?: () => Promise<void>; // Сохранение с закрытием формы (для кнопки "Сохранить")
  next?: (onGoToNextFrame: () => void) => Promise<void>;
  delete?: () => Promise<void>;
  clickFrame?: (
    targetIndex: number,
    currentIndex: number,
    onFrameChange: () => void
  ) => void | Promise<void>;
  actions: Action[];
  additionalActions?: Action[];
  autoSaveOnNext?: boolean; // Автоматически вызывать save() при нажатии "Далее"
}

export interface SlideWizardProps {
  frames: Frame[];
  currentFrame: number;
  onFrameChange: (index: number) => void | Promise<void>;
  title?: string;
  subtitle?: string;
  hasClickableIndicators?: boolean;
}

export interface SlideProgressTabsProps {
  steps: number;
  active: number;
  onFrameClick?: (index: number) => void | Promise<void>;
}

export interface SlidePanelProps {
  value: number;
  index: number;
  Component: React.ComponentType;
}

export interface SlideIndicatorProps {
  frames: Frame[];
  currentFrame: number;
  onFrameClick?: (index: number) => void | Promise<void>;
}

export interface SlideFooterProps {
  actions: Action[];
  additionalActions?: Action[];
  defaultHandlers: Record<
    StandardHandler,
    (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  >;
  isLoading?: boolean;
}
