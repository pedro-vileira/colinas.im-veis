import type { CSSProperties } from "react";

/** Texto revelado palavra por palavra. *palavra* = destaque em serifa itálica. */
export function Words({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const plain = text.replace(/\*/g, "");
  const tokens: { t: string; em: boolean }[] = [];
  text.split(/(\*[^*]+\*)/).filter(Boolean).forEach((part) => {
    const em = part.startsWith("*");
    (em ? part.slice(1, -1) : part).split(/\s+/).filter(Boolean).forEach((w) => {
      if (/^[.,;:!?]+$/.test(w) && tokens.length) tokens[tokens.length - 1].t += w;
      else tokens.push({ t: w, em });
    });
  });
  return (
    <span className={`words ${className}`} data-reveal="words" style={{ "--d": `${delay}ms` } as CSSProperties}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {tokens.map((k, i) => (
          <span key={i}>
            <span className="w"><span className={k.em ? "serif" : undefined} style={{ "--i": i } as CSSProperties}>{k.t}</span></span>{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
