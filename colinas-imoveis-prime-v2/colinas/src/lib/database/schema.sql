-- Esquema PostgreSQL para a camada intermediária (ainda não ligado ao app; ver README).
create table if not exists properties (
  id              uuid primary key default gen_random_uuid(),
  kenlo_id        text not null unique,          -- identificador oficial externo
  slug            text not null unique,
  code            text not null,
  title           text not null,
  description     text not null default '',
  property_type   text not null,
  transaction_type text not null check (transaction_type in ('venda','locacao')),
  price           numeric(14,2),
  condominium_fee numeric(12,2),
  iptu            numeric(12,2),
  city            text not null,
  neighborhood    text not null,
  public_address  text,                          -- somente se o endereço for público
  latitude        double precision,
  longitude       double precision,
  built_area      numeric(10,2),
  land_area       numeric(12,2),
  bedrooms        smallint,
  suites          smallint,
  bathrooms       smallint,
  parking_spaces  smallint,
  living_rooms    smallint,
  features        jsonb not null default '[]',
  images          jsonb not null default '[]',
  is_featured     boolean not null default false,
  is_published    boolean not null default false,
  is_demo         boolean not null default false,
  source_payload  jsonb,                         -- original da fonte, para reconciliação
  last_synced_at  timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists properties_published_idx on properties (is_published, city, neighborhood);
