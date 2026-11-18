import Link from "next/link";
import { Shell } from "@/components/layout/Shell";

export default function NotFound() {
  return (
    <Shell>
      <section className="wrap" style={{ paddingBlock: "var(--s6)" }}>
        <p className="label label--red">404</p>
        <h1 className="display" style={{ margin: "16px 0 var(--s4)" }}>Página não encontrada<span style={{ color: "var(--red)" }}>.</span></h1>
        <Link href="/imoveis" className="link">Ver imóveis <span className="arrow" aria-hidden="true">→</span></Link>
      </section>
    </Shell>
  );
}
