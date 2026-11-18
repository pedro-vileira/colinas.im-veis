import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="dark footer sec">
      <div className="wrap">
        <p className="footer__giant" aria-hidden="true">COLINAS<span> IMÓVEIS</span></p>
        <div className="footer__grid">
          <div><Logo /><p className="label" style={{ marginTop: 12 }}>Compra e venda de imóveis · São José dos Campos</p></div>
          <nav aria-label="Rodapé">
            <p className="label" style={{ marginBottom: 14 }}>Navegação</p>
            <ul>
              <li><Link href="/imoveis">Imóveis</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </nav>
          <div>
            <p className="label" style={{ marginBottom: 14 }}>Contato</p>
            <ul>
              {c.phone && <li><a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a></li>}
              {c.email && <li><a href={`mailto:${c.email}`}>{c.email}</a></li>}
              {c.whatsapp && <li><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
              {!c.phone && !c.email && !c.whatsapp && <li style={{ color: "#9a8f91" }}>Contatos a configurar (.env)</li>}
            </ul>
          </div>
          <div>
            <p className="label" style={{ marginBottom: 14 }}>Endereço e redes</p>
            <ul>
              {c.address && <li>{c.address}</li>}
              {c.instagram && <li><a href={c.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
              {!c.address && !c.instagram && <li style={{ color: "#9a8f91" }}>A configurar (.env)</li>}
            </ul>
          </div>
        </div>
        <hr className="rule" style={{ marginBlock: "var(--s4) var(--s2)" }} />
        <p className="label">© {new Date().getFullYear()} Colinas Imóveis. Todos os direitos reservados.</p>
        <p className="label" style={{ marginTop: 6 }}>Informações legais (razão social, CNPJ, CRECI): a preencher com dados oficiais.</p>
      </div>
    </footer>
  );
}
