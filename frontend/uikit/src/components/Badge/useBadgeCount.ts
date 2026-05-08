import { useLayoutEffect, useRef, useState } from "react";

export function useBadgeCount(
  itemsCount: number,
  gapPx: number = 4,
  inputMinWidthPx: number = 60,
) {
  const containerRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLElement>(null);
  const badgeRefs = useRef<Array<HTMLElement | null>>([]);

  const [visibleCount, setVisibleCount] = useState(itemsCount);
  const [hiddenCount, setHiddenCount] = useState(0);

  const measure = () => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const containerWidth = containerEl.offsetWidth;

    if (containerWidth <= 0) {
      return;
    }

    if (itemsCount === 0) {
      if (visibleCount !== 0 || hiddenCount !== 0) {
        setVisibleCount(0);
        setHiddenCount(0);
      }
      return;
    }

    const availableWidth = Math.max(0, containerWidth - inputMinWidthPx - 46);
    const plusWidth = moreRef.current ? moreRef.current.offsetWidth : 0;

    const widths = Array.from({ length: itemsCount }, (_, i) => {
      const el = badgeRefs.current[i];
      return el ? el.offsetWidth : 0;
    });

    const anyMeasured = widths.some((w) => w > 0);
    if (!anyMeasured) {
      return;
    }

    const totalAll =
      widths.reduce((acc, w) => acc + w, 0) +
      gapPx * Math.max(0, itemsCount - 1);

    if (totalAll <= availableWidth) {
      if (visibleCount !== itemsCount || hiddenCount !== 0) {
        setVisibleCount(itemsCount);
        setHiddenCount(0);
      }
      return;
    }

    let newVisible = 0;
    let usedWidth = 0;

    for (let i = 0; i < itemsCount; i++) {
      const w = widths[i] || 0;

      if (i > 0) usedWidth += gapPx;
      usedWidth += w;

      const hasHiddenAfter = i < itemsCount - 1;
      const needed = hasHiddenAfter ? usedWidth + gapPx + plusWidth : usedWidth;

      if (needed <= availableWidth) {
        newVisible = i + 1;
      } else {
        break;
      }
    }

    const newHidden = itemsCount - newVisible;

    if (newVisible !== visibleCount) setVisibleCount(newVisible);
    if (newHidden !== hiddenCount) setHiddenCount(newHidden);
  };

  useLayoutEffect(() => {
    badgeRefs.current.length = itemsCount;

    const raf = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(raf);
    
  }, [itemsCount]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(measure);
    });

    ro.observe(el);
    return () => ro.disconnect();

  }, []);

  const setBadgeRef = (index: number) => (el: HTMLElement | null) => {
    badgeRefs.current[index] = el;
  };

  return {
    visibleCount,
    hiddenCount,
    setBadgeRef,
    containerRef,
    moreRef,
  };
}
