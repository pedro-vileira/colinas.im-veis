import fs from "node:fs";
import path from "node:path";

/** Procura public/brand/<name>.<ext>. Retorna a URL pública ou null (server-only). */
export function brandAsset(name: string, exts: string[] = ["svg", "png"]): string | null {
  for (const e of exts) {
    if (fs.existsSync(path.join(process.cwd(), "public", "brand", `${name}.${e}`))) return `/brand/${name}.${e}`;
  }
  return null;
}
