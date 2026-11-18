/** Nada aqui é inventado: dados de contato vêm do ambiente. Ausente = não exibido. */
const clean = (v?: string) => (v && v.trim() ? v.trim() : null);

export const site = {
  name: "Colinas Imóveis Prime",
  shortName: "Colinas",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "pt_BR",
  description:
    "Curadoria de imóveis residenciais e comerciais para viver, investir e construir patrimônio.",
  contact: {
    whatsapp: clean(process.env.WHATSAPP_NUMBER)?.replace(/\D/g, "") ?? null,
    phone: clean(process.env.CONTACT_PHONE),
    email: clean(process.env.CONTACT_EMAIL),
    address: clean(process.env.CONTACT_ADDRESS),
    instagram: clean(process.env.INSTAGRAM_URL),
  },
} as const;
