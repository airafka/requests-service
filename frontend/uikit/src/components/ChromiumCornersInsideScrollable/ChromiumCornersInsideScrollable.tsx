import { useTheme } from "@mui/material";

export const CHROMIUM_CORNERS_BACKGROUND = "--chromium-corners-background";

export const ChromiumCornersInsideScrollable = ({
  radius,
  zIndex = 1,
  hasVarticalScrollbar = false,
  hasHorizontalScrollbar = false,
}: {
  radius: number;
  zIndex?: number;
  hasVarticalScrollbar?: boolean;
  hasHorizontalScrollbar?: boolean;
}) => {
  const theme = useTheme();

  if (
    !!(navigator as any)?.userAgentData &&
    (navigator as any).userAgentData.brands.some(
      (data: any) => data.brand == "Chromium"
    )
  ) {
    const backgroundColor = `var(${CHROMIUM_CORNERS_BACKGROUND}, ${theme.mainBackgroundColor})`;
    return (
      <>
        <div
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor,
            position: "absolute",
            zIndex,
            top: "0",
            left: "0",
            clipPath: `polygon(
                            0% 100%,
                            0% 0%,
                            100% 0%,
                            calc(100% - calc(100% * sin(30deg))) calc(100% - calc(100% * cos(30deg))),
                            calc(100% - calc(100% * sin(45deg))) calc(100% - calc(100% * cos(45deg))),
                            calc(100% - calc(100% * sin(60deg))) calc(100% - calc(100% * cos(60deg)))
                        )`,
          }}
        ></div>
        <div
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor,
            position: "absolute",
            zIndex,
            top: 0,
            right: hasVarticalScrollbar ? "10px" : 0,
            clipPath: `polygon(
                            0% 0%,
                            100% 0%,
                            100% 100%,
                            calc(100% * sin(60deg)) calc(100% - calc(100% * cos(60deg))),
                            calc(100% * sin(45deg)) calc(100% - calc(100% * cos(45deg))),
                            calc(100% * sin(30deg)) calc(100% - calc(100% * cos(30deg)))
                        )`,
          }}
        ></div>
        <div
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor,
            position: "absolute",
            zIndex,
            bottom: hasHorizontalScrollbar ? "10px" : 0,
            right: hasVarticalScrollbar ? "10px" : 0,
            clipPath: `polygon(
                            0% 100%,
                            100% 100%,
                            100% 0%,
                            calc(100% * sin(60deg)) calc(100% * cos(60deg)),
                            calc(100% * sin(45deg)) calc(100% * cos(45deg)),
                            calc(100% * sin(30deg)) calc(100% * cos(30deg))
                        )`,
          }}
        ></div>
        <div
          style={{
            width: `${radius}px`,
            height: `${radius}px`,
            backgroundColor,
            position: "absolute",
            zIndex,
            bottom: hasHorizontalScrollbar ? "10px" : 0,
            left: "0",
            clipPath: `polygon(
                            0% 0%,
                            0% 100%,
                            100% 100%,
                            calc(100% - calc(100% * sin(30deg))) calc(100% * cos(30deg)),
                            calc(100% - calc(100% * sin(45deg))) calc(100% * cos(45deg)),
                            calc(100% - calc(100% * sin(60deg))) calc(100% * cos(60deg))
                        )`,
          }}
        ></div>
      </>
    );
  }

  return <></>;
};
