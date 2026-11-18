import { site } from "@/config/site";

export function whatsappLink(message?: string): string | null {
  const n = site.contact.whatsapp;
  if (!n) return null;
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const propertyMessage = (code: string) =>
  `Olá! Tenho interesse no imóvel ${code} e gostaria de receber mais informações.`;
