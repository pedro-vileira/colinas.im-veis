import Link from "next/link";
import type { CSSProperties } from "react";
import { Shell } from "@/components/layout/Shell";
import { Photo, cols } from "@/components/ui/Photo";
import { Words } from "@/components/motion/Words";
import { HeroFx } from "@/components/motion/HeroFx";
import { Magnetic } from "@/components/motion/Magnetic";
import { Carousel } from "@/components/motion/Carousel";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { HomeSearch } from "@/components/properties/HomeSearch";
import { getPublishedProperties } from "@/lib/database/repository";
import { whatsappLink } from "@/lib/whatsapp";
import { brandAsset } from "@/lib/brand";
import { orgJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic";

const demoImg = (f: string, alt: string) => ({ src: `/demo/${f}.svg`, alt: `${alt} (imagem de demonstração)`, width: 1600, height: 1100 });
const dots = [
  { id: "hero", label: "Abertura" }, { id: "colinas", label: "A Colinas" }, { id: "destaques", label: "Imóveis em destaque" },
  { id: "busca", label: "Busca" }, { id: "atuacao", label: "Nossa atuação" }, { id: "experiencia", label: "Experiência Colinas" }, { id: "contato", label: "Contato" },
];
const pillars = [
  ["01", "Conhecimento de mercado", "Leitura local e comparativa de cada negociação."],
  ["02", "Inteligência comercial", "Posicionamento claro do imóvel diante do mercado."],
  ["03", "Atendimento personalizado", "Cada cliente é atendido de forma próxima e direta."],
  ["04", "Avaliação de imóveis", "Critérios objetivos para chegar ao valor adequado."],
  ["05", "Posicionamento estratégico", "Apresentação e momento de venda planejados."],
  ["06", "Confiança e transparência", "Informação completa em todas as etapas."],
] as const;
const from = (c: string) => ({ "--from": c }) as CSSProperties;

export default async function Home() {
  const all = await getPublishedProperties();
  const list = [...all.filter((p) => p.isFeatured), ...all.filter((p) => !p.isFeatured)].filter((p) => p.images.length).slice(0, 8);
  const wa = whatsappLink("Olá! Gostaria de conversar com a Colinas sobre imóveis.");
  const heroSrc = brandAsset("hero", ["jpg", "jpeg", "webp", "png", "avif"]) ?? "/demo/hero.svg";
  const hero = { src: heroSrc, alt: "Residência de alto padrão (imagem do hero)", width: 2400, height: 1600 };

  return (
    <Shell overlay demo={all.some((p) => p.isDemo)} dots={dots}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />

      {/* 01 — Hero */}
      <HeroFx id="hero" className="hero" labelledBy="h-hero">
        <div className="hero__img"><div className="hero__par"><Photo image={hero} ratio="32" sizes="100vw" priority className="hero__photo" /></div></div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="wrap hero__inner">
          <div className="hero__chips rise">
            <span className="glass chipg">São José dos Campos</span>
            <span className="glass chipg">Compra e venda</span>
          </div>
          <h1 id="h-hero" className="hero__title">
            <Words text="MAIS QUE IMÓVEIS." /><br />
            <Words text="NOVAS FORMAS DE *viver.*" delay={260} />
          </h1>
          <div className="hero__bottom">
            <p className="hero__cue label rise rise-3"><i aria-hidden="true" />Role</p>
            <div className="glass hero__card rise rise-3">
              <p>Uma curadoria de imóveis para viver, investir e construir patrimônio.</p>
              <Magnetic><Link href="/imoveis" className="gbtn gbtn--red" data-cursor="Explorar">Explorar imóveis <span aria-hidden="true">→</span></Link></Magnetic>
            </div>
          </div>
        </div>
      </HeroFx>

      {/* 02 — A Colinas */}
      <section id="colinas" className="sec sec--paper" style={from("var(--night)")}>
        <div className="wrap grid">
          <p className="label label--red col" style={cols(4, 8, 2)} data-reveal="up">— 02 · Colinas</p>
          <div className="col" style={cols(4, 8, 9, 4)}>
            <h2 className="h2 h2--xl"><Words text="EXPERIÊNCIA QUE TRANSFORMA A FORMA DE *negociar* IMÓVEIS." /></h2>
          </div>
          <div className="col body" style={cols(4, 5, 4, 4)} data-reveal="up">
            <p>A Colinas construiu sua trajetória a partir do relacionamento com o mercado imobiliário e do entendimento das necessidades de cada negociação.</p>
            <p>Em São José dos Campos, conectamos propriedades, pessoas e oportunidades com conhecimento, estratégia e proximidade.</p>
            <p style={{ marginTop: 28 }}><Link href="/sobre" className="link link--red">Conheça a Colinas <span className="arrow" aria-hidden="true">→</span></Link></p>
          </div>
          <div className="col" style={cols(4, 3, 4, 9)}><Photo image={demoImg("c", "Volumes de concreto e luz natural")} ratio="34" sizes="(min-width:1100px) 28vw, 70vw" reveal /></div>
        </div>
      </section>

      {/* 03 — Destaques (carrossel) */}
      <section id="destaques" className="sec sec--wine" style={from("var(--paper)")}>
        <div className="wrap" style={{ marginBottom: "var(--s4)" }}>
          <p className="label label--red" data-reveal="up">— 03 · Imóveis em destaque</p>
          <h2 className="h2 h2--xl" style={{ marginTop: 16 }}><Words text="Uma seleção *em movimento.*" /></h2>
        </div>
        {list.length > 0 ? (
          <Carousel count={list.length} label="Imóveis em destaque">
            {list.map((p, i) => <div key={p.id} className="slot"><PropertyCard p={p} priority={i < 2} /></div>)}
          </Carousel>
        ) : (
          <p className="wrap lead">Nenhum imóvel publicado no momento.</p>
        )}
      </section>

      {/* 04 — Busca */}
      <section id="busca" className="sec sec--paper" style={from("var(--wine)")}>
        <div className="wrap grid" style={{ alignItems: "end" }}>
          <div className="col" style={cols(4, 8, 7)}>
            <p className="label label--red" data-reveal="up">— 04 · Busca</p>
            <h2 className="h2 h2--xl" style={{ marginTop: 16 }}><Words text="Encontre seu próximo *imóvel.*" /></h2>
          </div>
          <p className="col label" style={cols(4, 8, 3, 10)} data-reveal="up">{all.length} {all.length === 1 ? "imóvel publicado" : "imóveis publicados"}</p>
        </div>
        <div className="wrap" style={{ marginTop: "var(--s4)" }} data-reveal="up"><HomeSearch properties={all} /></div>
      </section>

      {/* 05 — Atuação */}
      <section id="atuacao" className="sec sec--night" style={from("var(--paper)")}>
        <div className="wrap">
          <p className="label label--red" data-reveal="up">— 05 · Nossa atuação</p>
          <h2 className="h2 h2--xl" style={{ margin: "16px 0 var(--s5)", maxWidth: "16ch" }}><Words text="Método, mercado e *proximidade.*" /></h2>
          <ol className="grid panels">
            {pillars.map(([n, t, d], i) => (
              <li key={n} className="col panel glass" style={cols(4, i % 3 === 0 ? 8 : 4, [5, 4, 3, 3, 5, 4][i], [1, 6, 10, 1, 4, 9][i])} data-reveal="up">
                <span className="label label--red">{n}</span>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Experiência Colinas */}
      <section id="experiencia" className="sec sec--paper" style={from("var(--night)")}>
        <div className="wrap exp">
          <Photo image={demoImg("b", "Arquitetura contemporânea")} ratio="21" sizes="100vw" className="exp__img" reveal />
          <div className="glass exp__panel" data-reveal="up">
            <p className="label label--red">— 06 · Experiência Colinas</p>
            <h2 className="h2" style={{ margin: "14px 0 18px" }}>Atendimento que <span className="serif">acompanha</span> cada decisão.</h2>
            <ul>
              <li><b>Atendimento</b> próximo, do primeiro contato à negociação.</li>
              <li><b>Experiência de mercado</b> aplicada a cada imóvel.</li>
              <li><b>Relacionamento</b> construído com clareza e confiança.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 07 — CTA */}
      <section id="contato" className="sec sec--wine cta" style={from("var(--paper)")}>
        <div className="wrap">
          <h2 className="cta__title"><Words text="SEU PRÓXIMO *capítulo* COMEÇA AQUI." /></h2>
          <div className="cta__actions" data-reveal="up">
            <Magnetic><Link href="/contato" className="btn btn--red btn--xl" data-cursor="Falar">Entrar em contato <span aria-hidden="true">→</span></Link></Magnetic>
            {wa && <a href={wa} className="link" target="_blank" rel="noopener noreferrer">ou pelo WhatsApp</a>}
          </div>
        </div>
      </section>
    </Shell>
  );
}
