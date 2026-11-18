# Colinas Imóveis Prime — site

Next.js (App Router) + TypeScript + Zod. Design system em `src/app/globals.css` (tokens CSS), fonte Geologica via `next/font`.

## Rodar
```bash
cp .env.example .env.local   # preencher contatos reais
npm install
npm run dev
```

## Estado
- Páginas: `/`, `/imoveis` (filtros funcionais), `/imovel/[slug]`, `/sobre`, `/contato`, sitemap, robots, 404.
- Dados: **demonstração** (provider mock, banner visível). Imagens: **SVGs de placeholder** em `public/demo/`; substituir por fotografia real.
- Logo: wordmark provisório em `components/layout/Logo.tsx`; trocar pelo SVG oficial.
- Kenlo: arquitetura pronta, **integração real não implementada** (ver `docs/KENLO.md`).
- Banco: esquema em `src/lib/database/schema.sql`; o app usa repositório **em memória** por ora.
- Formulário: exige `CONTACT_WEBHOOK_URL`; sem ele responde 503 (não finge envio).
- Tailwind, Prisma/Drizzle e Framer Motion **não** foram usados (CSS próprio, animações em CSS).
