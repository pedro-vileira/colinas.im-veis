"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PropertyImage } from "@/types/property";

const RATIOS = ["32", "45", "11", "169", "34"] as const;

export function Gallery({ images }: { images: PropertyImage[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState<number | null>(null);
  const close = useCallback(() => { ref.current?.close(); setI(null); }, []);
  const go = useCallback((d: number) => setI((c) => (c == null ? c : (c + d + images.length) % images.length)), [images.length]);

  useEffect(() => { if (i != null && !ref.current?.open) ref.current?.showModal(); }, [i]);
  useEffect(() => {
    if (i == null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [i, go]);

  return (
    <>
      <div className="gallery">
        {images.slice(0, 5).map((img, n) => (
          <button key={img.src + n} className={`g${n}`} onClick={() => setI(n)} aria-label={`Ampliar foto ${n + 1} de ${images.length}`}>
            <div className={`media media--zoom ratio-${n === 0 ? "32" : RATIOS[n % RATIOS.length]}`}>
              <Image src={img.src} alt={img.alt} fill priority={n === 0} unoptimized={img.src.endsWith(".svg")}
                sizes={n === 0 ? "(min-width:900px) 66vw, 100vw" : "(min-width:900px) 33vw, 50vw"} />
            </div>
          </button>
        ))}
      </div>
      {images.length > 5 && <button className="chip" style={{ marginTop: 16 }} onClick={() => setI(5)}>Ver todas as {images.length} fotos</button>}
      <dialog ref={ref} className="lightbox" onClose={() => setI(null)} aria-label="Galeria de fotos">
        {i != null && (
          <>
            <div className="lightbox__bar">
              <span className="label" aria-live="polite">{i + 1} / {images.length}</span>
              <div>
                <button className="lb" onClick={() => go(-1)}>Anterior</button>
                <button className="lb" onClick={() => go(1)}>Próxima</button>
                <button className="lb" onClick={close}>Fechar</button>
              </div>
            </div>
            <div className="lightbox__stage">
              <Image key={i} className="rise" src={images[i].src} alt={images[i].alt} fill sizes="100vw"
                style={{ objectFit: "contain" }} unoptimized={images[i].src.endsWith(".svg")} />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
