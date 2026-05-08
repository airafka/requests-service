import React, { SVGProps } from "react";
import { Box } from '@mui/material'

interface SvgCheckIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const SvgCheckIcon: React.FC<SvgCheckIconProps> = (props) => {
  return (
    <Box sx={{ width: props.size, height: props.size, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "auto" }}>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1666 0.833313L4.99992 9.99998L0.833252 5.83331" stroke={props.color} stroke-width="1.66667"
              stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Box>
  );
};

export default SvgCheckIcon;
