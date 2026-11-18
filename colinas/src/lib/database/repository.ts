import type { Property } from "@/types/property";
import type { PropertyRepository } from "@/lib/kenlo/types";
import { getProvider } from "@/lib/kenlo/client";
import { syncProperties } from "@/lib/kenlo/sync";

/**
 * Repositório em memória (processo). Implementa a mesma interface que a versão PostgreSQL
 * deve implementar (schema em ./schema.sql). Para produção, trocar por implementação SQL.
 */
class MemoryRepository implements PropertyRepository {
  private byKenloId = new Map<string, Property>();

  async all() {
    return [...this.byKenloId.values()];
  }
  async upsertByKenloId(p: Property) {
    const existing = this.byKenloId.get(p.kenloId);
    this.byKenloId.set(p.kenloId, existing ? { ...p, id: existing.id } : p);
    return existing ? ("updated" as const) : ("created" as const);
  }
  async markMissingUnpublished(seen: Set<string>) {
    let n = 0;
    for (const [id, p] of this.byKenloId) {
      if (!seen.has(id) && p.isPublished) {
        this.byKenloId.set(id, { ...p, isPublished: false });
        n++;
      }
    }
    return n;
  }
}

const g = globalThis as unknown as { __repo?: MemoryRepository; __ready?: Promise<unknown> };
const repo = (g.__repo ??= new MemoryRepository());

async function ensureLoaded() {
  g.__ready ??= syncProperties(getProvider(), repo).catch((e) => {
    g.__ready = undefined; // permite nova tentativa
    throw e;
  });
  await g.__ready;
}

export async function resyncNow() {
  g.__ready = undefined;
  return syncProperties(getProvider(), repo);
}

/** Único ponto de leitura pública: imóveis despublicados nunca saem daqui. */
export async function getPublishedProperties(): Promise<Property[]> {
  await ensureLoaded();
  return (await repo.all()).filter((p) => p.isPublished);
}

export async function getPropertyBySlug(slug: string) {
  return (await getPublishedProperties()).find((p) => p.slug === slug) ?? null;
}

export async function getFeatured(limit = 3) {
  const all = await getPublishedProperties();
  const f = all.filter((p) => p.isFeatured);
  return (f.length ? f : all).slice(0, limit);
}

export async function getRelated(p: Property, limit = 3) {
  const all = (await getPublishedProperties()).filter((x) => x.id !== p.id);
  const score = (x: Property) => (x.city === p.city ? 2 : 0) + (x.propertyType === p.propertyType ? 1 : 0);
  return all.sort((a, b) => score(b) - score(a)).slice(0, limit);
}
