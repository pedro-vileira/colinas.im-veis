import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";
import { Tilt } from "@/components/motion/Tilt";
import { PropertyMeta } from "./PropertyMeta";

/** Card do carrossel: foto grande, 3D tilt, vidro, troca de imagem no hover. Só dados reais do imóvel. */
export function PropertyCard({ p, priority }: { p: Property; priority?: boolean }) {
  const [a, b] = p.images;
  const svg = (s: string) => s.endsWith(".svg");
  return (
    <Tilt className="pcard-wrap">
      <Link href={`/imovel/${p.slug}`} className="pcard" data-cursor="Ver">
        <div className="pcard__media">
          {a && <Image src={a.src} alt={a.alt} fill priority={priority} sizes="(min-width:900px) 40vw, 80vw" unoptimized={svg(a.src)} />}
          {b && <Image className="pcard__alt" src={b.src} alt="" fill sizes="(min-width:900px) 40vw, 80vw" unoptimized={svg(b.src)} />}
        </div>
        <span className="glass pcard__tag">{p.isFeatured && <i aria-hidden="true" />}{p.isFeatured ? "Destaque" : p.propertyType}</span>
        <span className="glass pcard__mark" aria-hidden="true"><i />COLINAS</span>
        <div className="glass pcard__panel">
          <h3 className="pcard__title">{p.title}</h3>
          <p className="label">{p.neighborhood} · {p.city}</p>
          <PropertyMeta p={p} />
          <div className="pcard__row">
            <span className="price">{formatPrice(p.price)}</span>
            <span className="label">Cód. {p.code} <b aria-hidden="true">→</b></span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
