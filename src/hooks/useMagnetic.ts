import { useEffect, useRef } from "react";
import { usePointerFine } from "./usePointerFine";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Attaches a very subtle magnetic pull toward the cursor while hovering.
 * `strength` controls the max pixel offset. Disabled entirely on touch
 * devices and when the user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null);
  const isFine = usePointerFine();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !isFine || reduced) return;

    let frame = 0;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.transform = "translate(0px, 0px)";
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [isFine, reduced, strength]);

  return ref;
}
