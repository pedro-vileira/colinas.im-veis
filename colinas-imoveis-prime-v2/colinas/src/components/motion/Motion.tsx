"use client";
import { useEffect, useRef } from "react";

/**
 * Motor único de movimento (sem dependências):
 * 1) revelações por IntersectionObserver ([data-reveal]);
 * 2) reflexo de luz do vidro que segue o ponteiro (.glass → --mx/--my);
 * 3) cursor personalizado (só mouse fino; desligado com reduced-motion).
 */
export function Motion() {
  const cur = useRef<HTMLDivElement>(null);
  const lab = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const el = cur.current!;
    el.dataset.on = "1";
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, glassRaf = 0;
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target as Element;
      const withLabel = t.closest("[data-cursor]") as HTMLElement | null;
      el.classList.toggle("is-link", !!t.closest("a,button,input,select,textarea,summary,[data-cursor]"));
      el.classList.toggle("has-label", !!withLabel);
      if (lab.current) lab.current.textContent = withLabel?.dataset.cursor ?? "";
      const g = t.closest(".glass") as HTMLElement | null;
      if (g) {
        cancelAnimationFrame(glassRaf);
        glassRaf = requestAnimationFrame(() => {
          const r = g.getBoundingClientRect();
          g.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          g.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        });
      }
    };
    const leave = () => el.classList.add("is-hidden");
    const enter = () => el.classList.remove("is-hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      cancelAnimationFrame(raf); cancelAnimationFrame(glassRaf);
    };
  }, []);

  return (
    <div ref={cur} className="cursor" aria-hidden="true">
      <span className="cursor__ring"><span ref={lab} className="cursor__label" /></span>
    </div>
  );
}
