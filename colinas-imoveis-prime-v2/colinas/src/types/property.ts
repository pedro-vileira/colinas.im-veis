export type TransactionType = "venda" | "locacao";

export type PropertyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Modelo normalizado usado pelo site. Valores ausentes são `null`, nunca 0. */
export type Property = {
  id: string;
  kenloId: string; // identificador externo oficial (chave única)
  slug: string;
  code: string;
  title: string;
  description: string;
  propertyType: string;
  transactionType: TransactionType;
  price: number | null;
  condominiumFee: number | null;
  iptu: number | null;
  city: string;
  neighborhood: string;
  publicAddress: string | null; // só preenchido quando o endereço é público
  coordinates: { lat: number; lng: number } | null;
  builtArea: number | null;
  landArea: number | null;
  bedrooms: number | null;
  suites: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  livingRooms: number | null;
  features: string[];
  images: PropertyImage[];
  isFeatured: boolean;
  isPublished: boolean;
  isDemo: boolean;
  lastSyncedAt: string;
};
