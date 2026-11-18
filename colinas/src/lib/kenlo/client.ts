import { KenloNotConfirmedError, type PropertyProvider } from "./types";
import { mockProvider } from "./mock-data";

/**
 * Seleção de provider.
 * - Sem credenciais/URLs configuradas → provider MOCK (dados de demonstração).
 * - Com variáveis configuradas → provider Kenlo real, que AINDA NÃO está implementado,
 *   porque endpoints, autenticação e campos não foram confirmados em documentação oficial.
 *   Ver docs/KENLO.md. Em vez de simular a integração, falha de forma explícita.
 */
export function getProvider(): PropertyProvider {
  const { KENLO_API_BASE_URL, KENLO_API_KEY, KENLO_XML_FEED_URL } = process.env;
  const configured = Boolean(KENLO_XML_FEED_URL || (KENLO_API_BASE_URL && KENLO_API_KEY));
  if (!configured) return mockProvider;
  return unconfirmedKenloProvider;
}

const unconfirmedKenloProvider: PropertyProvider = {
  name: "kenlo",
  async fetchAll() {
    throw new KenloNotConfirmedError(
      "Provider Kenlo não implementado: endpoints, autenticação e formato de dados precisam ser " +
        "confirmados com a Kenlo (docs/KENLO.md). Remova as variáveis KENLO_* para usar dados de demonstração.",
    );
  },
};
