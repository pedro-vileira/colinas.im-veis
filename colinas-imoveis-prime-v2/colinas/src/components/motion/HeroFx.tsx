"use client";
import { useRef } from "react";

/** Parallax sutil do hero em resposta ao mouse (--px/--py de -1 a 1). */
export function HeroFx({ children, className, id, labelledBy }: { children: React.ReactNode; className?: string; id?: string; labelledBy?: string }) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  return (
    <section
      ref={ref} id={id} className={className} aria-labelledby={labelledBy}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const { clientX: cx, clientY: cy } = e;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
          const el = ref.current; if (!el) return;
          el.style.setProperty("--px", String((cx / innerWidth - 0.5) * 2));
          el.style.setProperty("--py", String((cy / innerHeight - 0.5) * 2));
        });
      }}
    >
      {children}
    </section>
  );
}
