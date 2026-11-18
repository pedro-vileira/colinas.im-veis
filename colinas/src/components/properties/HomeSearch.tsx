import type { Property } from "@/types/property";
import { Magnetic } from "@/components/motion/Magnetic";

const uniq = (a: string[]) => [...new Set(a)].sort((x, y) => x.localeCompare(y, "pt-BR"));

/** Busca da home: formulário GET → /imoveis, que aplica os mesmos filtros funcionais do catálogo. */
export function HomeSearch({ properties }: { properties: Property[] }) {
  const types = uniq(properties.map((p) => p.propertyType));
  const cities = uniq(properties.map((p) => p.city));
  return (
    <form action="/imoveis" method="get" className="finder" role="search" aria-label="Buscar imóveis">
      <div className="field"><label htmlFor="h-q">Palavra-chave</label><input id="h-q" name="q" className="input" placeholder="Bairro, código…" /></div>
      <div className="field"><label htmlFor="h-type">Tipo</label>
        <select id="h-type" name="type" className="select"><option value="">Todos</option>{types.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className="field"><label htmlFor="h-city">Cidade</label>
        <select id="h-city" name="city" className="select"><option value="">Todas</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div className="field"><label htmlFor="h-max">Preço máximo (R$)</label><input id="h-max" name="max" className="input" inputMode="numeric" placeholder="Sem limite" /></div>
      <Magnetic><button className="btn btn--red">Buscar imóveis <span aria-hidden="true">→</span></button></Magnetic>
    </form>
  );
}
