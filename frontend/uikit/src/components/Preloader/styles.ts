import { keyframes } from "@emotion/react";
import { createUseStyles } from "../../hooks/createUseStyles";

export const usePreloaderStyles = createUseStyles(() => {
  const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `
  return {
    preloader: {
      display: "flex",
      animation: `${rotation} 1s linear infinite`,
    },
  };
});
