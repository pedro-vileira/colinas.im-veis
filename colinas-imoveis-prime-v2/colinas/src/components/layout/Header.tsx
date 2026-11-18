"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

const links = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header({ logo, whatsapp }: { logo: ReactNode; whatsapp: string | null }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  const cur = (h: string) => (path === h || path.startsWith(h + "/") ? "page" : undefined);

  return (
    <header className="gh">
      <div className="gh__bar">
        <div className="glass gh__brand">{logo}</div>
        <nav className="glass gh__nav" aria-label="Principal">
          {links.map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
        </nav>
        <div className="gh__right">
          <Magnetic><Link href="/imoveis#busca" className="glass gbtn gbtn--sm">Buscar</Link></Magnetic>
          {whatsapp && (
            <Magnetic><a href={`https://wa.me/${whatsapp}`} className="glass gbtn gbtn--sm gbtn--red" target="_blank" rel="noopener noreferrer">WhatsApp</a></Magnetic>
          )}
        </div>
        <button className="glass gbtn gh__menu" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)}>
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      <div id="menu-mobile" className={`sheet ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu móvel">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} aria-current={cur(l.href)} style={{ "--i": i } as React.CSSProperties}>{l.label}</Link>
          ))}
          <Link href="/imoveis#busca" style={{ "--i": 3 } as React.CSSProperties}>Buscar imóvel</Link>
          {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ "--i": 4 } as React.CSSProperties}>WhatsApp</a>}
        </nav>
      </div>
    </header>
  );
}
