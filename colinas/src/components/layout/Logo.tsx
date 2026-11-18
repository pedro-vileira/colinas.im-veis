import Link from "next/link";

/**
 * Wordmark provisório. Substituir pelo arquivo oficial (logo_vetorizado.svg) SEM redesenhar/deformar:
 * basta trocar o conteúdo deste componente por <Image src="/logo.svg" .../>.
 */
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Colinas Imóveis Prime — página inicial">
      COLINAS<i>.</i>
    </Link>
  );
}
