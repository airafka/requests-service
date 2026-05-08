import { createUseStyles } from "@/hooks/createUseStyles";

export const useOverflowTextStyles = createUseStyles({
  root: {
    position: "relative",
    overflow: "hidden",
  },
  measurer: {
    position: "absolute",
    whiteSpace: "nowrap",
    opacity: "0",
    pointerEvents: "none",
    visibility: "hidden",
    // достаточно для определения наличия переполнения
    // но не будет сильно вылезать за пределы родительского элемента
    // создавая горизонтальный скролл при overflow: auto
    maxWidth: "calc(100% + 1px)",
    overflow: "hidden",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
