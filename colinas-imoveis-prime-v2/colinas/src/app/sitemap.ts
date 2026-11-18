import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPublishedProperties } from "@/lib/database/repository";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const props = (await getPublishedProperties().catch(() => [])).filter((p) => !p.isDemo);
  return [
    ...["", "/imoveis", "/sobre", "/contato"].map((p) => ({ url: `${site.url}${p}` })),
    ...props.map((p) => ({ url: `${site.url}/imovel/${p.slug}`, lastModified: p.lastSyncedAt })),
  ];
}
