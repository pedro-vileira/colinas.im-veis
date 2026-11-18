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

## Redesign V2 (Luxury Editorial / Liquid Glass / Motion)
- Sem novas dependências: movimento em CSS + componentes client enxutos em `src/components/motion/` (revelações, cursor, tilt 3D, magnético, carrossel, parallax).
- Vidro: classe `.glass` (blur + borda translúcida + reflexo que segue o mouse) usada com critério: header, tags, painéis, setas, indicadores.
- Paleta V2: vinho `#2B0A12`/`#5A1424`, vermelho `#E22400`, noite `#0D0507`, off-white `#F3F1EC` (tokens em `globals.css`).
- Logo: salve `public/brand/logo.svg` ou `logo.png`; altura em `--logo-h`. Foto do hero: `public/brand/hero.jpg`. Ver `public/brand/LEIA-ME.txt`.
- Busca da home envia para `/imoveis?...`, que aplica os mesmos filtros funcionais.
- Respeita `prefers-reduced-motion`; cursor e tilt só com mouse; carrossel usa scroll nativo no toque.
- Não testado em navegador (ambiente sem rede/npm).
