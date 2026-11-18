const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export const formatPrice = (v: number | null) => (v == null ? "Sob consulta" : brl.format(v));
export const formatArea = (v: number | null) => (v == null ? null : `${v.toLocaleString("pt-BR")} m²`);

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
