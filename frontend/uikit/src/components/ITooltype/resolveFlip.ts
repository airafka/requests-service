import { TooltipType } from "./types";

const flipH = (v: "left" | "right") => (v === "left" ? "right" : "left");
const flipV = (v: "top" | "bottom") => (v === "top" ? "bottom" : "top");

export function resolveFlip(
  base: TooltipType,
  anchorEl: HTMLElement,
  tooltipEl: HTMLElement,
) {
  const margin = 8;

  const a = anchorEl.getBoundingClientRect();
  const p = tooltipEl.getBoundingClientRect();

  const anchorX = base.anchor.horizontal === "left" ? a.left : a.right;
  const anchorY = base.anchor.vertical === "top" ? a.top : a.bottom;

  const growsRight = base.transform.horizontal === "left";
  const growsDown = base.transform.vertical === "top";

  const spaceX = growsRight ? window.innerWidth - anchorX : anchorX;
  const spaceY = growsDown ? window.innerHeight - anchorY : anchorY;

  const needFlipX = spaceX < p.width + margin;
  const needFlipY = spaceY < p.height + margin;

  if (!needFlipX && !needFlipY) return base;

  return {
    anchor: {
      vertical: needFlipY ? flipV(base.anchor.vertical) : base.anchor.vertical,
      horizontal: needFlipX
        ? flipH(base.anchor.horizontal)
        : base.anchor.horizontal,
    },
    transform: {
      vertical: needFlipY
        ? flipV(base.transform.vertical)
        : base.transform.vertical,
      horizontal: needFlipX
        ? flipH(base.transform.horizontal)
        : base.transform.horizontal,
    },
  };
}
