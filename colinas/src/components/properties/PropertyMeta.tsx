import type { Property } from "@/types/property";
import { formatArea } from "@/lib/format";

/** Mostra apenas dados existentes; nunca exibe ausência como zero. */
export function PropertyMeta({ p }: { p: Property }) {
  const items = [
    formatArea(p.builtArea) && `${formatArea(p.builtArea)} construídos`,
    p.builtArea == null && formatArea(p.landArea) && `${formatArea(p.landArea)} de terreno`,
    p.bedrooms != null && `${p.bedrooms} ${p.bedrooms === 1 ? "dorm." : "dorms."}`,
    p.suites != null && `${p.suites} ${p.suites === 1 ? "suíte" : "suítes"}`,
    p.parkingSpaces != null && `${p.parkingSpaces} ${p.parkingSpaces === 1 ? "vaga" : "vagas"}`,
  ].filter(Boolean) as string[];
  return (
    <p className="meta">
      {items.map((i) => (
        <span key={i}>{i}</span>
      ))}
    </p>
  );
}
