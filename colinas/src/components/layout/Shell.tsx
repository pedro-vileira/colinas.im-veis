import { site } from "@/config/site";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Shell({ children, overlay = false, demo = false }: { children: React.ReactNode; overlay?: boolean; demo?: boolean }) {
  return (
    <>
      <a href="#conteudo" className="skip">Ir para o conteúdo</a>
      {demo && (
        <div className="demo-note" role="note">
          <b>DEMONSTRAÇÃO</b> — imóveis, preços e imagens fictícios. Integração Kenlo ainda não conectada.
        </div>
      )}
      <Header overlay={overlay} whatsapp={site.contact.whatsapp} />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}
