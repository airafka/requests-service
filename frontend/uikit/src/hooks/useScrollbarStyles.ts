import { Theme } from "@mui/material";

export const SCROLLBAR_CUSTOM_TRACK_COLOR = "--scrollbar-custom-track-color";
export const SCROLLBAR_CUSTOM_THUMB_COLOR = "--scrollbar-custom-thumb-color";
export const SCROLLBAR_CUSTOM_THUMB_COLOR_HOVER =
  "--scrollbar-custom-thumb-color-hover";

export const useScrollbarStyles = (theme: Theme) => {
  const trackColor = `var(${SCROLLBAR_CUSTOM_TRACK_COLOR}, ${theme.mainBackgroundColor})`;
  const thumbColor = `var(${SCROLLBAR_CUSTOM_THUMB_COLOR}, ${theme.colors.gray.gray200})`;
  const thumbColorHover = `var(${SCROLLBAR_CUSTOM_THUMB_COLOR_HOVER}, ${theme.colors.gray.lightGrey})`;

  return {
    [`&::-webkit-scrollbar, & *::-webkit-scrollbar`]: {
      width: "4px",
      height: "4px",
    },
    [`&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb`]: {
      backgroundColor: thumbColor,
      borderRadius: "8px",
      border: `0 solid ${trackColor}`,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: thumbColorHover,
      },
    },
    [`&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track`]: {
      backgroundColor: trackColor,
    },
    [`&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner`]: {
      backgroundColor: trackColor,
    },
  };
};
