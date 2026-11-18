import type { Property } from "@/types/property";

/**
 * Formato INTERMEDIÁRIO definido por este projeto (não é o contrato da Kenlo).
 * Cada provider real deve mapear os campos oficiais da Kenlo para este formato
 * somente depois que a documentação/credenciais forem confirmadas.
 */
export type RawSourceProperty = {
  externalId: string;
  code: string;
  title: string;
  description?: string;
  propertyType: string;
  transactionType: "venda" | "locacao";
  price?: number | null;
  condominiumFee?: number | null;
  iptu?: number | null;
  city: string;
  neighborhood: string;
  publicAddress?: string | null;
  coordinates?: { lat: number; lng: number } | null;
  builtArea?: number | null;
  landArea?: number | null;
  bedrooms?: number | null;
  suites?: number | null;
  bathrooms?: number | null;
  parkingSpaces?: number | null;
  livingRooms?: number | null;
  features?: string[];
  images?: { src: string; alt?: string; width?: number; height?: number }[];
  featured?: boolean;
  published: boolean;
  isDemo?: boolean;
};

export interface PropertyProvider {
  readonly name: string;
  /** Retorna todos os imóveis conhecidos pela fonte (publicados ou não). */
  fetchAll(): Promise<RawSourceProperty[]>;
}

export class KenloNotConfirmedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KenloNotConfirmedError";
  }
}

export type SyncResult = {
  provider: string;
  startedAt: string;
  received: number;
  created: number;
  updated: number;
  unpublished: number;
  invalid: number;
  errors: string[];
};

export interface PropertyRepository {
  all(): Promise<Property[]>;
  upsertByKenloId(p: Property): Promise<"created" | "updated">;
  markMissingUnpublished(seenKenloIds: Set<string>): Promise<number>;
}
