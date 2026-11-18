"use client";
import { useMemo, useState } from "react";
import type { Property } from "@/types/property";
import { LotCard } from "./LotCard";
import { cols } from "@/components/ui/Photo";

type F = {
  q: string; type: string; tx: string; city: string; hood: string;
  min: string; max: string; beds: string; suites: string; baths: string; park: string;
  built: string; land: string; code: string; sort: string;
};
export type CatalogInitial = Partial<F>;
const EMPTY: F = { q: "", type: "", tx: "", city: "", hood: "", min: "", max: "", beds: "", suites: "", baths: "", park: "", built: "", land: "", code: "", sort: "rel" };

const uniq = (a: string[]) => [...new Set(a)].sort((x, y) => x.localeCompare(y, "pt-BR"));
const num = (s: string) => (s.trim() === "" ? null : Number(s.replace(/\./g, "").replace(",", ".")));
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Padrão editorial: proporções e larguras variam ao longo da lista. */
const PATTERN: { ratio: "45" | "32" | "169" | "11" | "34"; m: number; t: number; d: number; sd?: number }[] = [
  { ratio: "32", m: 4, t: 8, d: 7 },
  { ratio: "45", m: 4, t: 4, d: 4, sd: 9 },
  { ratio: "11", m: 4, t: 4, d: 4 },
  { ratio: "34", m: 4, t: 4, d: 3, sd: 6 },
  { ratio: "169", m: 4, t: 8, d: 5, sd: 9 },
];

export function PropertyCatalog({ properties, initial }: { properties: Property[]; initial?: CatalogInitial }) {
  const [f, setF] = useState<F>({ ...EMPTY, ...initial });
  const [more, setMore] = useState(false);
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  const types = useMemo(() => uniq(properties.map((p) => p.propertyType)), [properties]);
  const cities = useMemo(() => uniq(properties.map((p) => p.city)), [properties]);
  const hoods = useMemo(
    () => uniq(properties.filter((p) => !f.city || p.city === f.city).map((p) => p.neighborhood)),
    [properties, f.city],
  );

  const results = useMemo(() => {
    const min = num(f.min), max = num(f.max);
    const gte = (v: number | null, s: string) => s === "" || (v != null && v >= Number(s));
    const out = properties.filter((p) => {
      if (f.q && !norm(`${p.title} ${p.neighborhood} ${p.city} ${p.code} ${p.description}`).includes(norm(f.q))) return false;
      if (f.type && p.propertyType !== f.type) return false;
      if (f.tx && p.transactionType !== f.tx) return false;
      if (f.city && p.city !== f.city) return false;
      if (f.hood && p.neighborhood !== f.hood) return false;
      if (f.code && !norm(p.code).includes(norm(f.code))) return false;
      if (min != null && (p.price == null || p.price < min)) return false;
      if (max != null && (p.price == null || p.price > max)) return false;
      return gte(p.bedrooms, f.beds) && gte(p.suites, f.suites) && gte(p.bathrooms, f.baths) &&
        gte(p.parkingSpaces, f.park) && gte(p.builtArea, f.built) && gte(p.landArea, f.land);
    });
    const by = (fn: (p: Property) => number) => [...out].sort((a, b) => fn(a) - fn(b));
    if (f.sort === "asc") return by((p) => p.price ?? Infinity);
    if (f.sort === "desc") return by((p) => -(p.price ?? -Infinity));
    if (f.sort === "area") return by((p) => -(p.builtArea ?? 0));
    return by((p) => (p.isFeatured ? 0 : 1));
  }, [properties, f]);

  const active = Object.entries(f).some(([k, v]) => k !== "sort" && v !== "");
  const numSel = (k: keyof F, label: string) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      <select id={`f-${k}`} className="select" value={f[k]} onChange={set(k)}>
        <option value="">Qualquer</option>
        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <form id="busca" className="filters" role="search" aria-label="Filtrar imóveis" onSubmit={(e) => e.preventDefault()}>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="f-q">Buscar</label>
          <input id="f-q" className="input" type="search" placeholder="Bairro, tipo, palavra-chave" value={f.q} onChange={set("q")} />
        </div>
        <div className="field">
          <label htmlFor="f-type">Tipo</label>
          <select id="f-type" className="select" value={f.type} onChange={set("type")}>
            <option value="">Todos</option>{types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-tx">Transação</label>
          <select id="f-tx" className="select" value={f.tx} onChange={set("tx")}>
            <option value="">Todas</option><option value="venda">Venda</option><option value="locacao">Locação</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-city">Cidade</label>
          <select id="f-city" className="select" value={f.city} onChange={(e) => setF((s) => ({ ...s, city: e.target.value, hood: "" }))}>
            <option value="">Todas</option>{cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-hood">Bairro</label>
          <select id="f-hood" className="select" value={f.hood} onChange={set("hood")}>
            <option value="">Todos</option>{hoods.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-min">Preço mínimo (R$)</label>
          <input id="f-min" className="input" inputMode="numeric" placeholder="0" value={f.min} onChange={set("min")} />
        </div>
        <div className="field">
          <label htmlFor="f-max">Preço máximo (R$)</label>
          <input id="f-max" className="input" inputMode="numeric" placeholder="Sem limite" value={f.max} onChange={set("max")} />
        </div>
        <div className="field">
          <label htmlFor="f-code">Código</label>
          <input id="f-code" className="input" value={f.code} onChange={set("code")} />
        </div>
        <div className="field" style={{ alignContent: "end" }}>
          <button type="button" className="chip" aria-expanded={more} onClick={() => setMore((m) => !m)}>
            {more ? "Menos filtros" : "Mais filtros"}
          </button>
        </div>
        {more && (
          <>
            {numSel("beds", "Dormitórios")}
            {numSel("suites", "Suítes")}
            {numSel("baths", "Banheiros")}
            {numSel("park", "Vagas")}
            <div className="field">
              <label htmlFor="f-built">Área construída mín. (m²)</label>
              <input id="f-built" className="input" inputMode="numeric" value={f.built} onChange={set("built")} />
            </div>
            <div className="field">
              <label htmlFor="f-land">Área do terreno mín. (m²)</label>
              <input id="f-land" className="input" inputMode="numeric" value={f.land} onChange={set("land")} />
            </div>
          </>
        )}
      </form>

      <div className="toolbar">
        <p role="status" aria-live="polite" className="label label--ink">
          {results.length} {results.length === 1 ? "imóvel" : "imóveis"}
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {active && <button className="chip" type="button" onClick={() => setF({ ...EMPTY, sort: f.sort })}>Limpar filtros</button>}
          <div className="field" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label htmlFor="f-sort">Ordenar</label>
            <select id="f-sort" className="select" style={{ width: "auto" }} value={f.sort} onChange={set("sort")}>
              <option value="rel">Destaques</option><option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option><option value="area">Maior área</option>
            </select>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="lead" style={{ paddingBlock: "var(--s5)" }}>Nenhum imóvel corresponde a esta seleção. Ajuste os filtros ou limpe a busca.</p>
      ) : (
        <div className="grid" style={{ rowGap: "var(--s5)" }}>
          {results.map((p, i) => {
            const s = PATTERN[i % PATTERN.length];
            return (
              <div key={p.id} className="col" style={cols(s.m, s.t, s.d, s.sd)}>
                <LotCard p={p} ratio={s.ratio} sizes="(min-width:1100px) 45vw, 100vw" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
