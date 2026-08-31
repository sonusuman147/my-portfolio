import { useEffect, useRef } from "react";
import { usePointerFine } from "../hooks/usePointerFine";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, .cursor-interactive";

export default function CursorEffects() {
  const isFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFine || reduced) return;

    document.body.classList.add("custom-cursor-active");

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    // Target position (raw mouse) vs. rendered position (lerped for the glow)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR);
      dot.classList.toggle("is-active", Boolean(el));
    };

    const tick = () => {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isFine, reduced]);

  if (!isFine || reduced) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
