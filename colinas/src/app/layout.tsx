import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const geologica = Geologica({ subsets: ["latin"], variable: "--font-geologica", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Espaços que atravessam o tempo`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: site.locale, siteName: site.name, title: site.name, description: site.description },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#F3F1EC", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geologica.variable}>
      <body>{children}</body>
    </html>
  );
}
