import "@mui/material/styles";
import { TokensType } from "./tokens";

declare module "@mui/material/styles" {
  interface Theme {
    mainBackgroundColor: string;
    surfaceColor: string;
    colors: {
      charcoal: string;
      fossil: string;
      white: string;
      iron: string;
      primary: {
        main: string;
        variant: string;
        variant800: string;
        variant80: string;
        light: string;
        light20: string;
        light30: string;
        light80: string;
        white: string;
        50: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        variant: string;
        variant50: string;
        light: string;
        light20: string;
        light50: string;
        light80: string;
        200: string;
      };
      gray: {
        disabledF3: string;
        disabled: string;
        superLightGray: string;
        lightGrey: string;
        smokyGrey: string;
        gray_1: string;
        grayIron: string;
        gray200: string;
        grayShadow_1: string;
        grayShadow_2: string;
        grayShadow_4: string;
        grayShadow_8: string;
      };
      black: {
        main: string;
        black10: string;
        black20: string;
      };
      label: {
        blue_4_20: string;
        purple_1: string;
        purple_2: string;
        purple_3: string;
        red_1: string;
        red_2: string;
        red_3: string;
        red_4: string;
        yellow_1: string;
        yellow_2: string;
        yellow_3: string;
        green_1: string;
        green_2: string;
        green_3: string;
        green_4: string;
        blue_1: string;
        blue_2: string;
        blue_3: string;
        blue_5_80: string;
        lightGreen_1: string;
        lightGreen_2: string;
        lightPurple_1: string;
        lightPurple_2: string;
        lightYellow_1: string;
        lightYellow_2: string;
        lightRed_1: string;
        lightRed_2: string;
        softGreen_1: string;
        softGreen_2: string;
        darkGray_1: string;
        darkGray_2: string;
      };
      error: string;
      error_1: string;
      errorShadow: string;
      success: string;
    };
    // === Токены из Figma (отдельный раздел) ===
    tokensFigma: TokensType;
  }
  interface ThemeOptions {
    mainBackgroundColor?: string;
    surfaceColor?: string;
    colors?: {
      charcoal?: string;
      fossil?: string;
      iron?: string;
      primary?: {
        main?: string;
        variant?: string;
        light?: string;
        light20?: string;
        light30?: string;
        light80?: string;
        white?: string;
        50?: string;
        dark?: string;
        contrastText?: string;
      };
      secondary?: {
        main?: string;
        variant?: string;
        variant50?: string;
        light?: string;
        light20?: string;
        light50?: string;
        light80?: string;
        200?: string;
      };
      gray?: {
        disabledF3?: string;
        disabled?: string;
        superLightGray?: string;
        lightGrey?: string;
        smokyGrey?: string;
        gray_1?: string;
        grayIron?: string;
        gray200?: string;
        grayShadow_1?: string;
        grayShadow_2?: string;
        grayShadow_4?: string;
        grayShadow_8: string;
      };
      black?: {
        main?: string;
        black10?: string;
        black20?: string;
      };
      label?: {
        blue_4_20?: string;
        purple_1?: string;
        purple_2?: string;
        purple_3?: string;
        red_1?: string;
        red_2?: string;
        red_3?: string;
        yellow_1?: string;
        yellow_2?: string;
        yellow_3?: string;
        green_1?: string;
        green_2?: string;
        green_3?: string;
        blue_1?: string;
        blue_2?: string;
        blue_3?: string;
        blue_5_80: string;
      };
      error?: string;
      errorShadow?: string;
      success?: string;
    };
    // === Токены из Figma (отдельный раздел) ===
    tokensFigma?: TokensType;
  }
}
