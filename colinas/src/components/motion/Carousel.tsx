"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { children: React.ReactNode; count: number; label: string };

/** Carrossel por scroll-snap: toque nativo no mobile; arrastar com mouse; setas; teclado; progresso animado. */
export function Carousel({ children, count, label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [idx, setIdx] = useState(0);

  const update = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const t = track.current; if (!t) return;
      const max = Math.max(t.scrollWidth - t.clientWidth, 1);
      const p = t.scrollLeft / max;
      bar.current?.style.setProperty("--p", String(p));
      setIdx(Math.round(p * (count - 1)));
      setEdge((e) => {
        const s = t.scrollLeft < 4, en = t.scrollLeft >= max - 4;
        return e.start === s && e.end === en ? e : { start: s, end: en };
      });
    });
  }, [count]);

  useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, [update]);

  const by = (dir: 1 | -1) => {
    const t = track.current; if (!t) return;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * t.clientWidth * 0.6, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carrossel" aria-label={label}>
      <div
        ref={track}
        className={`track ${dragging ? "is-drag" : ""}`}
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); by(1); } if (e.key === "ArrowLeft") { e.preventDefault(); by(-1); } }}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
          drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: 0 };
        }}
        onPointerMove={(e) => {
          const d = drag.current; if (!d.down || !track.current) return;
          d.moved = Math.abs(e.clientX - d.x);
          if (d.moved > 6) setDragging(true);
          track.current.scrollLeft = d.left - (e.clientX - d.x);
        }}
        onPointerUp={() => { drag.current.down = false; setDragging(false); }}
        onPointerLeave={() => { drag.current.down = false; setDragging(false); }}
        onClickCapture={(e) => { if (drag.current.moved > 6) { e.preventDefault(); e.stopPropagation(); drag.current.moved = 0; } }}
      >
        {children}
      </div>
      <div className="wrap carousel__bar">
        <p className="label" aria-live="polite">{String(idx + 1).padStart(2, "0")} <span style={{ opacity: .5 }}>/ {String(count).padStart(2, "0")}</span></p>
        <span ref={bar} className="progressline" aria-hidden="true"><i /></span>
        <div className="arrows">
          <button className="glass roundbtn" onClick={() => by(-1)} disabled={edge.start} aria-label="Imóveis anteriores"><span aria-hidden="true">←</span></button>
          <button className="glass roundbtn" onClick={() => by(1)} disabled={edge.end} aria-label="Próximos imóveis"><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}
