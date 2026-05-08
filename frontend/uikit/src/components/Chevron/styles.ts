import { useToken } from "@/theme";
import { createUseStyles } from "../../hooks/createUseStyles";
import { ChevronProps } from "./types";

const chevronStyles = createUseStyles({
  chevron: (props: ChevronProps) => ({
    width: props.size,
    height: props.size,
    transition: 'transform 0.2s ease',
    "&.up": {
      transform: "rotate(180deg)",
    },
    "&.down": {
      transform: "rotate(0deg)",
    },
    "&.left": {
      transform: "rotate(90deg)",
    },
    "&.right": {
      transform: "rotate(270deg)",
    },
    "& path": {
      stroke: props.color ? props.color : useToken("chevron/color/icon/default"),
    },
    ":hover": {
      "& path": {
        stroke: props.hover ? "#3472ED" : ''
      }
    }
  }),
});

export default chevronStyles;
