import { normalize } from "./normalize";
import type { PropertyProvider, PropertyRepository, SyncResult } from "./types";

const log = (level: "info" | "warn" | "error", msg: string, extra?: unknown) =>
  console[level](`[kenlo-sync] ${msg}`, extra ?? "");

/**
 * Sincronização idempotente: chave única = kenloId (id oficial), nunca o título.
 * Preços, descrição, fotos, destaque e publicação são sobrescritos a cada execução.
 * Imóveis que sumiram da fonte são despublicados (não apagados).
 * Frequência permitida pelo Kenlo NÃO confirmada — não agendar agressivamente.
 */
export async function syncProperties(provider: PropertyProvider, repo: PropertyRepository): Promise<SyncResult> {
  const result: SyncResult = {
    provider: provider.name,
    startedAt: new Date().toISOString(),
    received: 0, created: 0, updated: 0, unpublished: 0, invalid: 0, errors: [],
  };
  const raws = await provider.fetchAll();
  result.received = raws.length;
  const seen = new Set<string>();

  for (const raw of raws) {
    try {
      const p = normalize(raw, result.startedAt);
      if (seen.has(p.kenloId)) {
        log("warn", `duplicado ignorado: ${p.kenloId}`);
        continue;
      }
      seen.add(p.kenloId);
      const r = await repo.upsertByKenloId(p);
      result[r] += 1;
    } catch (e) {
      result.invalid += 1;
      result.errors.push(`${raw?.externalId ?? "?"}: ${e instanceof Error ? e.message : String(e)}`);
      log("error", `registro inválido ${raw?.externalId ?? "?"}`, e);
    }
  }
  result.unpublished = await repo.markMissingUnpublished(seen);
  log("info", "concluído", result);
  return result;
}
