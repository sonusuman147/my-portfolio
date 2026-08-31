import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { usePointerFine } from "../hooks/usePointerFine";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const LINK_DISTANCE = 150;

export default function DataBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const isFine = usePointerFine();
  
  // Parallax offset for the background
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isFine || reduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      
      setOffset({
        // Shift by up to 20px
        x: currentX * 20,
        y: currentY * 20
      });
      
      frameId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [isFine, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768;
    const density = isMobile ? 22000 : 15000;

    const lineColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() || "#35C9C1";
    const dotColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--text-muted").trim() || "#8D97B4";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Give the canvas a bit of overscan to hide parallax edges
      const overscan = 60;
      canvas.width = (width + overscan * 2) * dpr;
      canvas.height = (height + overscan * 2) * dpr;
      canvas.style.width = `${width + overscan * 2}px`;
      canvas.style.height = `${height + overscan * 2}px`;
      canvas.style.left = `-${overscan}px`;
      canvas.style.top = `-${overscan}px`;
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.floor((width * height) / density));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * (width + overscan * 2),
        y: Math.random() * (height + overscan * 2),
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }));
    };

    const draw = () => {
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      ctx.clearRect(0, 0, cw, ch);

      const dc = dotColor();
      const lc = lineColor();

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cw) p.vx *= -1;
        if (p.y < 0 || p.y > ch) p.vy *= -1;
        p.x = Math.max(0, Math.min(cw, p.x));
        p.y = Math.max(0, Math.min(ch, p.y));
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = lc;
            ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.12;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.35;
      ctx.fillStyle = dc;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    resize();

    if (reduced) {
      draw();
      cancelAnimationFrame(frame);
    } else {
      frame = requestAnimationFrame(draw);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <>
      <div 
        className="fixed inset-[-50px] -z-30 pointer-events-none bg-grid bg-[length:40px_40px] opacity-70 transition-transform duration-[50ms] ease-linear" 
        aria-hidden="true"
        style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
      />
      <canvas
        ref={canvasRef}
        className="fixed -z-20 pointer-events-none opacity-50 transition-transform duration-[50ms] ease-linear"
        aria-hidden="true"
        style={{ transform: `translate3d(${-offset.x * 1.5}px, ${-offset.y * 1.5}px, 0)` }}
      />
    </>
  );
}
