import React from "react";
import { SvgIcon, useTheme } from "@mui/material";
import XIcon from "./XIcon";

export const SvgXIcon = ({
  color,
  size = 20,
  width,
}: {
  color?: string;
  size?: number;
  width?: number;
}) => {
  const theme = useTheme();
  return (
    <SvgIcon
      component={XIcon}
      inheritViewBox
      style={{
        color: color || theme?.colors?.error,
        width: width ?? size,
        height: size,
      }}
    />
  );
};

export default SvgXIcon;
