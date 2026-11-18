import Link from "next/link";
import { site } from "@/config/site";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="dark footer" style={{ paddingBlock: "var(--s5) var(--s3)" }}>
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <p className="logo" style={{ fontSize: "2rem" }}>COLINAS<i>.</i></p>
            <p className="label" style={{ marginTop: 8 }}>Imóveis Prime</p>
          </div>
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
              {!c.phone && !c.email && !c.whatsapp && <li style={{ color: "#9a968e" }}>Contatos a configurar (.env)</li>}
            </ul>
          </div>
          <div>
            <p className="label" style={{ marginBottom: 14 }}>Endereço e redes</p>
            <ul>
              {c.address && <li>{c.address}</li>}
              {c.instagram && <li><a href={c.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
              {!c.address && !c.instagram && <li style={{ color: "#9a968e" }}>A configurar (.env)</li>}
            </ul>
          </div>
        </div>
        <hr className="rule" style={{ marginBlock: "var(--s4) var(--s2)" }} />
        <p className="label">© {new Date().getFullYear()} Colinas Imóveis Prime. Todos os direitos reservados.</p>
        <p className="label" style={{ marginTop: 6 }}>Informações legais (razão social, CNPJ, CRECI): a preencher com dados oficiais.</p>
      </div>
    </footer>
  );
}
