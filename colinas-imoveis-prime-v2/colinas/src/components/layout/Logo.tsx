import Link from "next/link";
import { brandAsset } from "@/lib/brand";

/** Slot da logo oficial: public/brand/logo.svg|png. Sem arquivo, mostra só o nome. Tamanho: --logo-h. */
export function Logo() {
  const src = brandAsset("logo");
  return (
    <Link href="/" className="brand" aria-label="Colinas Imóveis — página inicial">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img className="brand__img" src={src} alt="" />}
      <span className="brand__name">COLINAS <b>IMÓVEIS</b></span>
    </Link>
  );
}
