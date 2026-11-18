import Link from "next/link";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { PropertyMeta } from "./PropertyMeta";

type Props = {
  p: Property;
  ratio?: "45" | "32" | "169" | "11" | "34" | "21";
  sizes?: string;
  priority?: boolean;
  large?: boolean;
};

export function LotCard({ p, ratio = "32", sizes = "(min-width:1100px) 40vw, 100vw", priority, large }: Props) {
  return (
    <Link href={`/imovel/${p.slug}`} className="lot">
      <Photo image={p.images[0]} ratio={ratio} sizes={sizes} priority={priority} />
      <div className="stack">
        {p.isFeatured && <span className="tag">Destaque</span>}
        <h3 className={large ? "h2" : "h3"} style={large ? { fontSize: "clamp(1.75rem,3.2vw,2.75rem)" } : undefined}>{p.title}</h3>
        <p className="label">{p.neighborhood} · {p.city} · {p.propertyType}</p>
        <PropertyMeta p={p} />
        <div className="row">
          <span className="price">{formatPrice(p.price)}</span>
          <span className="label">Cód. {p.code}</span>
        </div>
      </div>
    </Link>
  );
}
