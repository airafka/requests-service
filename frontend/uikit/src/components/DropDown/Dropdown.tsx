import { useRef } from "react";
import { type PopoverOrigin, Popover, Box, useTheme } from "@mui/material";
import { PickerPositions } from "@/types";
import { useSwitch } from "@/hooks";
import type { DropdownProps } from "./types";
import { useDropDownClasses } from "./styles";

export const Dropdown = ({
  position = PickerPositions.BOTTOM_START,
  withContentWrapper = true,
  opener,
  children,
}: DropdownProps) => {
  const { isOn: isOpen, on: onOpen, off: onClose } = useSwitch();

  const dropDownClasses = useDropDownClasses({})();

  const openerRef = useRef<HTMLElement>(null);

  const anchorTransformMap: Record<
    string,
    { anchorOrigin: PopoverOrigin; transformOrigin: PopoverOrigin }
  > = {
    "bottom-start": {
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      transformOrigin: { vertical: "top", horizontal: "left" },
    },
    "bottom-end": {
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      transformOrigin: { vertical: "top", horizontal: "right" },
    },
    "top-start": {
      anchorOrigin: { vertical: "top", horizontal: "left" },
      transformOrigin: { vertical: "bottom", horizontal: "left" },
    },
    "top-end": {
      anchorOrigin: { vertical: "top", horizontal: "right" },
      transformOrigin: { vertical: "bottom", horizontal: "right" },
    },
  };

  const { anchorOrigin, transformOrigin } = anchorTransformMap[position];

  return (
    <>
      {opener({
        isOpen,
        onOpen,
        setAnchorRef: (node) => {
          openerRef.current = node;
        },
      })}

      <Popover
        open={isOpen}
        onClose={onClose}
        anchorEl={openerRef.current}
        marginThreshold={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        className={dropDownClasses.popoverPaper}
        slotProps={{
          paper: {
            sx: {
              minWidth: openerRef.current?.offsetWidth,
            },
          },
        }}
      >
        {withContentWrapper ? (
          <Box gap={1} display={"flex"} flexDirection={"column"} padding={2}>
            {children}
          </Box>
        ) : (
          children
        )}
      </Popover>
    </>
  );
};
