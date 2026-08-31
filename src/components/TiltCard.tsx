import { useRef, useState, type ReactNode } from "react";
import { usePointerFine } from "../hooks/usePointerFine";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const MAX_TILT = 6; // degrees — kept small and professional

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hovering, setHovering] = useState(false);
  const isFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const interactive = isFine && !reduced;

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${relX * MAX_TILT * 2}deg) rotateX(${
        -relY * MAX_TILT * 2
      }deg) translateZ(0)`,
    });
  };

  const onLeave = () => {
    setHovering(false);
    setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out ${
        !hovering && !reduced ? "float-idle" : ""
      }`}
      style={{ ...style, transformStyle: "preserve-3d" }}
    >
      <div
        className={`transition-shadow duration-300 rounded-3xl ${
          hovering && interactive ? "shadow-2xl" : "shadow-xl"
        }`}
        style={
          hovering && interactive
            ? { boxShadow: "0 30px 60px -20px var(--accent-soft), 0 10px 30px -10px rgba(0,0,0,0.25)" }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
