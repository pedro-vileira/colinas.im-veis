import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Photo, cols } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Sobre",
  description: "A Colinas atua na compra e venda de imóveis com conhecimento de mercado, estratégia e proximidade.",
  alternates: { canonical: "/sobre" },
};
const img = (f: string, alt: string) => ({ src: `/demo/${f}.svg`, alt: `${alt} (imagem de demonstração)`, width: 1600, height: 1100 });

export default function Sobre() {
  return (
    <Shell>
      <section className="wrap" style={{ paddingBlock: "var(--s5) var(--s4)" }}>
        <p className="label label--red">Sobre</p>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem,8vw,7rem)", marginTop: 16 }}>
          Experiência<br />de mercado<span style={{ color: "var(--red)" }}>.</span><br />
          <span style={{ fontWeight: 600 }}>Uma nova perspectiva.</span>
        </h1>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--s6)" }}>
        <div className="grid" style={{ rowGap: "var(--s5)" }}>
          <div className="col" style={cols(4, 8, 7)}><Photo image={img("b", "Arquitetura em concreto")} ratio="169" sizes="(min-width:1100px) 58vw, 100vw" /></div>
          <div className="col body" style={{ ...cols(4, 6, 4, 9), alignSelf: "end" }}>
            <p>A Colinas construiu sua trajetória a partir do relacionamento com o mercado imobiliário e do entendimento das necessidades de cada negociação.</p>
            <p>Hoje, direcionamos nossa atuação à compra e venda de imóveis, conectando propriedades, pessoas e oportunidades com conhecimento, estratégia e proximidade.</p>
          </div>
          <div className="col" style={cols(4, 5, 4, 2)}><Photo image={img("d", "Interior com luz natural")} ratio="45" sizes="(min-width:1100px) 30vw, 100vw" /></div>
        </div>
      </section>
    </Shell>
  );
}
