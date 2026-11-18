"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type Props = { overlay?: boolean; whatsapp: string | null };
const links = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header({ overlay = false, whatsapp }: Props) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const cur = (h: string) => (path === h || path.startsWith(h + "/") ? "page" : undefined);

  return (
    <header className={`header ${overlay ? "header--overlay" : ""}`}>
      <div className="wrap header__bar">
        <Logo />
        <nav className="nav" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href="/imoveis#busca" className="link">Buscar</Link>
          {whatsapp && <a href={`https://wa.me/${whatsapp}`} className="link" target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(true)}>Menu</button>
      </div>
      {open && (
        <div id="menu-mobile" className="mobile" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="header__bar" style={{ padding: 0 }}>
            <Logo />
            <button className="menu-btn" onClick={() => setOpen(false)}>Fechar</button>
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>
          ))}
          <Link href="/imoveis#busca">Buscar imóvel</Link>
          {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
      )}
    </header>
  );
}
