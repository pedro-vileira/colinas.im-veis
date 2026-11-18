import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { ContactForm } from "@/components/ui/ContactForm";
import { cols } from "@/components/ui/Photo";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Colinas Imóveis Prime.",
  alternates: { canonical: "/contato" },
};

export default function Contato() {
  const c = site.contact;
  const wa = whatsappLink("Olá! Gostaria de falar com a Colinas.");
  const Row = ({ k, children }: { k: string; children: React.ReactNode }) => (
    <div style={{ borderTop: "1px solid var(--line)", padding: "14px 0" }}>
      <p className="label">{k}</p><p style={{ marginTop: 4 }}>{children}</p>
    </div>
  );
  const pending = <span style={{ color: "var(--gray)" }}>A configurar</span>;
  return (
    <Shell>
      <section className="wrap" style={{ paddingBlock: "var(--s5) var(--s6)" }}>
        <p className="label label--red">Contato</p>
        <h1 className="display" style={{ fontSize: "clamp(2.5rem,8vw,7rem)", margin: "16px 0 var(--s5)" }}>Vamos conversar<span style={{ color: "var(--red)" }}>.</span></h1>
        <div className="grid">
          <div className="col" style={cols(4, 8, 4)}>
            <Row k="WhatsApp">{wa ? <a className="link" href={wa} target="_blank" rel="noopener noreferrer">Iniciar conversa</a> : pending}</Row>
            <Row k="Telefone">{c.phone ? <a className="link" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a> : pending}</Row>
            <Row k="E-mail">{c.email ? <a className="link" href={`mailto:${c.email}`}>{c.email}</a> : pending}</Row>
            <Row k="Endereço comercial">{c.address ?? pending}</Row>
            <Row k="Instagram">{c.instagram ? <a className="link" href={c.instagram} target="_blank" rel="noopener noreferrer">Abrir perfil</a> : pending}</Row>
          </div>
          <div className="col" style={cols(4, 8, 6, 7)}><ContactForm /></div>
        </div>
      </section>
    </Shell>
  );
}
