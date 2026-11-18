"use client";
import { useEffect, useState } from "react";

export function SectionDots({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="dots glass" aria-label="Seções da página">
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-label={i.label} aria-current={active === i.id ? "true" : undefined} data-label={i.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
