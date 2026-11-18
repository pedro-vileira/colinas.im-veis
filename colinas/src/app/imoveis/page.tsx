import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { PropertyCatalog, type CatalogInitial } from "@/components/properties/PropertyCatalog";
import { getPublishedProperties } from "@/lib/database/repository";

export const metadata: Metadata = {
  title: "Imóveis selecionados",
  description: "Uma seleção de oportunidades residenciais e comerciais à venda.",
  alternates: { canonical: "/imoveis" },
};
export const dynamic = "force-dynamic";

const KEYS = ["q", "type", "tx", "city", "hood", "min", "max", "beds", "suites", "baths", "park", "built", "land", "code"] as const;

export default async function Imoveis({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const initial: CatalogInitial = {};
  for (const k of KEYS) { const v = sp[k]; if (typeof v === "string" && v.trim()) initial[k] = v.trim().slice(0, 80); }
  const properties = await getPublishedProperties();
  return (
    <Shell demo={properties.some((p) => p.isDemo)}>
      <section className="wrap" style={{ paddingBlock: "var(--s5) var(--s4)" }}>
        <p className="label label--red">Catálogo</p>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem,8vw,7rem)", margin: "16px 0 var(--s3)" }}>Imóveis<br />selecionados<span style={{ color: "var(--red)" }}>.</span></h1>
        <p className="lead">Uma seleção de oportunidades residenciais e comerciais.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--s6)" }}>
        <PropertyCatalog properties={properties} initial={initial} />
      </section>
    </Shell>
  );
}
