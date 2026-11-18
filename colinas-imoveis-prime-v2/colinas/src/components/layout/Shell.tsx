import { site } from "@/config/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Logo } from "./Logo";
import { Motion } from "@/components/motion/Motion";
import { SectionDots } from "@/components/motion/SectionDots";

type Props = {
  children: React.ReactNode;
  overlay?: boolean;
  demo?: boolean;
  dots?: { id: string; label: string }[];
};

export function Shell({ children, overlay = false, demo = false, dots }: Props) {
  return (
    <>
      <a href="#conteudo" className="skip">Ir para o conteúdo</a>
      <div className="progress" aria-hidden="true" />
      <Header logo={<Logo />} whatsapp={site.contact.whatsapp} />
      <main id="conteudo" className={overlay ? undefined : "pad-top"}>{children}</main>
      {dots && <SectionDots items={dots} />}
      <Footer />
      {demo && <div className="demo-note glass" role="note"><b>Demonstração</b> · dados e imagens fictícios</div>}
      <Motion />
    </>
  );
}
