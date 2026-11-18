"use client";
import { useRef } from "react";

/** Inclinação 3D + reflexo seguindo o mouse. Ignora toque; reduced-motion zera via CSS. */
export function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const set = (rx: string, ry: string, mx: string, my: string) => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", rx); el.style.setProperty("--ry", ry);
    el.style.setProperty("--mx", mx); el.style.setProperty("--my", my);
  };
  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => set(`${(0.5 - y) * max}deg`, `${(x - 0.5) * max}deg`, `${x * 100}%`, `${y * 100}%`));
      }}
      onPointerLeave={() => { cancelAnimationFrame(raf.current); set("0deg", "0deg", "50%", "50%"); }}
    >
      {children}
    </div>
  );
}
