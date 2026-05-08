import { Theme } from "@mui/material/styles";
import { baseTheme } from "./baseTheme";

export enum ThemeList {
  Base = "base",
}

export const createUikitTheme = (theme?: Theme): Theme => {
  return theme ?? baseTheme;
};

// Экспортируем утилиты для работы с токенами
export {
  useToken,
  TokenReturnType,
  useBorder,
  useBoxShadow,
  useSpacing,
  useFont,
  BorderStyle,
} from "./utils";
