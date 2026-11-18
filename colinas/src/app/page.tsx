import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Photo, cols } from "@/components/ui/Photo";
import { LotCard } from "@/components/properties/LotCard";
import { getFeatured, getPublishedProperties } from "@/lib/database/repository";
import { whatsappLink } from "@/lib/whatsapp";
import { orgJsonLd } from "@/lib/seo/jsonld";

const hero = { src: "/demo/hero.svg", alt: "Fachada arquitetônica em concreto e vidro (imagem de demonstração)", width: 1600, height: 1100 };
const editorial = { src: "/demo/c.svg", alt: "Volumes de concreto e luz natural (imagem de demonstração)", width: 1600, height: 1100 };

const pillars = [
  ["01", "Conhecimento de mercado", "Leitura local e comparativa de cada negociação."],
  ["02", "Inteligência comercial", "Posicionamento claro do imóvel diante do mercado."],
  ["03", "Atendimento personalizado", "Cada cliente é atendido de forma próxima e direta."],
  ["04", "Avaliação de imóveis", "Critérios objetivos para chegar ao valor adequado."],
  ["05", "Posicionamento estratégico", "Apresentação e momento de venda planejados."],
  ["06", "Confiança e transparência", "Informação completa em todas as etapas."],
] as const;

export default async function Home() {
  const [featured, all] = await Promise.all([getFeatured(3), getPublishedProperties()]);
  const wa = whatsappLink("Olá! Gostaria de conversar com a Colinas sobre imóveis.");
  const demo = all.some((p) => p.isDemo);
  const [big, ...small] = featured;

  return (
    <Shell overlay demo={demo}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <section className="hero" aria-labelledby="h-hero">
        <div className="hero__img"><Photo image={hero} ratio="32" sizes="100vw" priority className="" /></div>
        <style>{`.hero__img .media{position:absolute;inset:0;aspect-ratio:auto}`}</style>
        <div className="wrap hero__inner">
          <p className="label rise">Colinas Imóveis Prime — 01</p>
          <h1 id="h-hero" className="display rise rise-2" style={{ marginTop: 24 }}>
            Espaços que<br />atravessam<br />o tempo<span style={{ color: "var(--red)" }}>.</span>
          </h1>
          <div className="hero__foot rise rise-3">
            <p className="lead" style={{ margin: 0 }}>Uma curadoria de imóveis para viver, investir e construir patrimônio.</p>
            <Link href="/imoveis" className="link">Ver imóveis <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-intro">
        <div className="grid">
          <p className="label label--red col" style={cols(4, 8, 3)}>— Colinas</p>
          <div className="col" style={cols(4, 8, 8, 5)}>
            <h2 id="h-intro" className="h2">Mais do que encontrar um imóvel, reconhecer o valor de cada espaço.</h2>
            <div className="body" style={{ marginTop: "var(--s4)" }}>
              <p>A Colinas aproxima pessoas, oportunidades e propriedades por meio de uma atuação pautada em conhecimento de mercado, confiança e visão comercial.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" aria-labelledby="h-feat" style={{ paddingBottom: "var(--s6)" }}>
        <div className="sec-head"><span className="label">02</span><h2 id="h-feat" className="label label--ink">Imóveis em destaque</h2></div>
        {big && (
          <div className="grid" style={{ rowGap: "var(--s5)" }}>
            <div className="col" style={cols(4, 8, 8)}><LotCard p={big} ratio="169" sizes="(min-width:1100px) 62vw, 100vw" large /></div>
            {small[0] && <div className="col" style={cols(4, 4, 4, 9)}><LotCard p={small[0]} ratio="45" sizes="(min-width:1100px) 30vw, 100vw" /></div>}
            {small[1] && <div className="col" style={cols(4, 4, 5, 3)}><LotCard p={small[1]} ratio="32" sizes="(min-width:1100px) 40vw, 100vw" /></div>}
          </div>
        )}
        <p style={{ marginTop: "var(--s4)" }}><Link href="/imoveis" className="link link--red">Todos os imóveis <span className="arrow" aria-hidden="true">→</span></Link></p>
      </section>

      <section className="dark" aria-labelledby="h-edit">
        <div className="wrap grid" style={{ paddingBlock: "var(--s5)", alignItems: "end" }}>
          <div className="col" style={cols(4, 8, 6)}>
            <p className="label" style={{ marginBottom: "var(--s3)" }}>03</p>
            <h2 id="h-edit" className="h2" style={{ fontSize: "clamp(2.25rem,6.5vw,6rem)" }}>
              Cada espaço<br />tem uma história<span style={{ color: "var(--red)" }}>.</span><br />
              <span style={{ fontWeight: 600 }}>Cada escolha, um valor.</span>
            </h2>
          </div>
          <div className="col" style={cols(4, 8, 5, 8)}><Photo image={editorial} ratio="45" sizes="(min-width:1100px) 40vw, 100vw" /></div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-cur">
        <div className="grid">
          <p className="label label--red col" style={cols(4, 8, 3)}>04 — Curadoria</p>
          <div className="col" style={cols(4, 8, 6, 5)}>
            <h2 id="h-cur" className="h2">Uma seleção, não um catálogo.</h2>
            <div className="body" style={{ marginTop: "var(--s4)" }}>
              <p>O portfólio reúne oportunidades residenciais e comerciais escolhidas por critérios de localização, qualidade construtiva e potencial patrimonial.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--s6)" }} aria-labelledby="h-fil">
        <div className="sec-head"><span className="label">05</span><h2 id="h-fil" className="label label--ink">Como atuamos</h2></div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {pillars.map(([n, t, d]) => (
            <li key={n} className="grid" style={{ borderBottom: "1px solid var(--line)", paddingBlock: "var(--s3)" }}>
              <span className="label label--red col" style={cols(1, 1, 1)}>{n}</span>
              <h3 className="h3 col" style={cols(3, 7, 5, 2)}>{t}</h3>
              <p className="body col" style={cols(4, 8, 4, 8)}>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="dark" aria-labelledby="h-cta">
        <div className="wrap" style={{ paddingBlock: "var(--s6)" }}>
          <p className="label">06</p>
          <h2 id="h-cta" className="display" style={{ fontSize: "clamp(2.5rem,8vw,7rem)", margin: "24px 0 var(--s4)" }}>Seu próximo movimento começa aqui<span style={{ color: "var(--red)" }}>.</span></h2>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <Link href="/contato" className="link">Fale conosco <span className="arrow" aria-hidden="true">→</span></Link>
            {wa && <a href={wa} className="link" target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          </div>
        </div>
      </section>
    </Shell>
  );
}
