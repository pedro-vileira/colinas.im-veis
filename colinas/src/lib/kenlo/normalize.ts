import { z } from "zod";
import type { Property } from "@/types/property";
import { slugify } from "@/lib/format";
import type { RawSourceProperty } from "./types";

const num = z.number().finite().nonnegative().nullish();

export const rawSchema = z.object({
  externalId: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  propertyType: z.string().min(1),
  transactionType: z.enum(["venda", "locacao"]),
  price: num,
  condominiumFee: num,
  iptu: num,
  city: z.string().min(1),
  neighborhood: z.string().min(1),
  publicAddress: z.string().nullish(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).nullish(),
  builtArea: num,
  landArea: num,
  bedrooms: num,
  suites: num,
  bathrooms: num,
  parkingSpaces: num,
  livingRooms: num,
  features: z.array(z.string()).optional(),
  images: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    )
    .optional(),
  featured: z.boolean().optional(),
  published: z.boolean(),
  isDemo: z.boolean().optional(),
});

/** Zero em campos de contagem/área vira `null` para nunca exibir "0" como dado real. */
const n = (v: number | null | undefined) => (v == null || v === 0 ? null : v);

export function normalize(raw: RawSourceProperty, now = new Date().toISOString()): Property {
  const r = rawSchema.parse(raw);
  return {
    id: `prop_${r.externalId}`,
    kenloId: r.externalId,
    slug: `${slugify(r.title)}-${slugify(r.code)}`,
    code: r.code,
    title: r.title,
    description: r.description ?? "",
    propertyType: r.propertyType,
    transactionType: r.transactionType,
    price: n(r.price),
    condominiumFee: n(r.condominiumFee),
    iptu: n(r.iptu),
    city: r.city,
    neighborhood: r.neighborhood,
    publicAddress: r.publicAddress?.trim() || null,
    coordinates: r.coordinates ?? null,
    builtArea: n(r.builtArea),
    landArea: n(r.landArea),
    bedrooms: n(r.bedrooms),
    suites: n(r.suites),
    bathrooms: n(r.bathrooms),
    parkingSpaces: n(r.parkingSpaces),
    livingRooms: n(r.livingRooms),
    features: r.features ?? [],
    images: (r.images ?? []).map((i) => ({
      src: i.src,
      alt: i.alt ?? `${r.title} — ${r.neighborhood}, ${r.city}`,
      width: i.width ?? 1600,
      height: i.height ?? 1100,
    })),
    isFeatured: r.featured ?? false,
    isPublished: r.published,
    isDemo: r.isDemo ?? false,
    lastSyncedAt: now,
  };
}
