declare module "@alabuga/uikit" {
  import type { ReactNode } from "react";

  export function UikitProvider(props: {
    theme?: unknown;
    children: ReactNode;
  }): JSX.Element;
}
