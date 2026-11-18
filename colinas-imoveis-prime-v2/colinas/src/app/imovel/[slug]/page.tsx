import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { Gallery } from "@/components/properties/Gallery";
import { LotCard } from "@/components/properties/LotCard";
import { cols } from "@/components/ui/Photo";
import { getPropertyBySlug, getRelated } from "@/lib/database/repository";
import { formatArea, formatPrice } from "@/lib/format";
import { propertyMessage, whatsappLink } from "@/lib/whatsapp";
import { propertyJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic";
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getPropertyBySlug((await params).slug);
  if (!p) return { title: "Imóvel não encontrado", robots: { index: false } };
  const desc = `${p.propertyType} em ${p.neighborhood}, ${p.city}. ${formatPrice(p.price)}. Cód. ${p.code}.`;
  return {
    title: p.title,
    description: desc,
    alternates: { canonical: `/imovel/${p.slug}` },
    robots: p.isDemo ? { index: false, follow: false } : undefined,
    openGraph: { title: p.title, description: desc, type: "website", images: p.images[0] ? [{ url: p.images[0].src }] : undefined },
  };
}

export default async function ImovelPage({ params }: Params) {
  const p = await getPropertyBySlug((await params).slug);
  if (!p) notFound();
  const related = await getRelated(p);
  const wa = whatsappLink(propertyMessage(p.code));

  const specs: [string, string | null][] = [
    ["Área construída", formatArea(p.builtArea)],
    ["Área do terreno", formatArea(p.landArea)],
    ["Dormitórios", p.bedrooms?.toString() ?? null],
    ["Suítes", p.suites?.toString() ?? null],
    ["Banheiros", p.bathrooms?.toString() ?? null],
    ["Vagas", p.parkingSpaces?.toString() ?? null],
    ["Salas", p.livingRooms?.toString() ?? null],
    ["Tipo", p.propertyType],
    ["Condomínio", p.condominiumFee != null ? formatPrice(p.condominiumFee) : null],
    ["IPTU", p.iptu != null ? formatPrice(p.iptu) : null],
  ];
  const shown = specs.filter(([, v]) => v);
  const showMap = p.coordinates && p.publicAddress;

  return (
    <Shell demo={p.isDemo}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd(p)) }} />
      <article className="wrap" style={{ paddingBlock: "var(--s4) var(--s6)" }}>
        <nav aria-label="Trilha" className="label" style={{ marginBottom: "var(--s3)" }}>
          <Link href="/imoveis" className="link">← Imóveis</Link>
        </nav>
        <header className="grid" style={{ marginBottom: "var(--s4)", alignItems: "end" }}>
          <div className="col" style={cols(4, 8, 8)}>
            {p.isFeatured && <p className="tag" style={{ marginBottom: 12 }}>Destaque</p>}
            <h1 className="h2">{p.title}</h1>
            <p className="label" style={{ marginTop: 16 }}>{p.neighborhood} · {p.city}</p>
          </div>
          <div className="col" style={cols(4, 8, 4, 9)}>
            <p className="price" style={{ fontSize: "1.75rem", fontWeight: 300 }}>{formatPrice(p.price)}</p>
            <p className="label" style={{ marginTop: 4 }}>Código {p.code}</p>
          </div>
        </header>

        <Gallery images={p.images} />

        <dl className="specs" style={{ marginBlock: "var(--s5)" }}>
          {shown.map(([k, v]) => (
            <div className="spec" key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>

        <div className="grid">
          <div className="col" style={cols(4, 8, 6)}>
            <p className="label label--red" style={{ marginBottom: 16 }}>Descrição</p>
            <div className="body">{p.description.split("\n\n").map((t, i) => <p key={i}>{t}</p>)}</div>
          </div>
          {p.features.length > 0 && (
            <div className="col" style={cols(4, 8, 4, 9)}>
              <p className="label label--red" style={{ marginBottom: 16 }}>Características</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {p.features.map((f) => <li key={f} style={{ borderBottom: "1px solid var(--line)", padding: "10px 0" }}>{f}</li>)}
              </ul>
            </div>
          )}
        </div>

        <section aria-labelledby="loc" style={{ marginTop: "var(--s5)" }}>
          <p id="loc" className="label label--red" style={{ marginBottom: 16 }}>Localização</p>
          <p className="h3">{p.publicAddress ?? `${p.neighborhood}, ${p.city}`}</p>
          {showMap ? (
            <iframe title={`Mapa — ${p.title}`} loading="lazy" style={{ width: "100%", height: 380, border: 0, marginTop: 24 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${p.coordinates!.lng - 0.006}%2C${p.coordinates!.lat - 0.004}%2C${p.coordinates!.lng + 0.006}%2C${p.coordinates!.lat + 0.004}&layer=mapnik&marker=${p.coordinates!.lat}%2C${p.coordinates!.lng}`} />
          ) : (
            <p className="label" style={{ marginTop: 12 }}>Endereço exato disponível mediante contato.</p>
          )}
        </section>

        <section className="dark" style={{ marginTop: "var(--s5)", padding: "var(--s5) var(--margin)" }} aria-labelledby="ct">
          <h2 id="ct" className="h2">Quer conhecer este imóvel?</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: "var(--s4)" }}>
            {wa ? <a className="btn" href={wa} target="_blank" rel="noopener noreferrer">Falar no WhatsApp sobre {p.code}</a>
                : <Link className="btn" href="/contato">Enviar mensagem</Link>}
            <Link href="/contato" className="link">Formulário de contato <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: "var(--s6)" }} aria-labelledby="rel">
            <div className="sec-head"><h2 id="rel" className="label label--ink">Imóveis relacionados</h2></div>
            <div className="grid">
              {related.map((r) => (
                <div key={r.id} className="col" style={cols(4, 4, 4)}><LotCard p={r} ratio="45" sizes="(min-width:1100px) 30vw, 100vw" /></div>
              ))}
            </div>
          </section>
        )}
      </article>
    </Shell>
  );
}
