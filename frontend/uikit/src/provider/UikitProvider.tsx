import { FC, ReactNode, useMemo } from "react";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { createUikitTheme } from "../theme";

interface UikitProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export const UikitProvider: FC<UikitProviderProps> = ({ theme, children }) => {
  const muiTheme = useMemo(() => createUikitTheme(theme), [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
