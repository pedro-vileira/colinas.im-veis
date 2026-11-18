# Integração Kenlo — status de verificação

## Verificado em páginas oficiais da Kenlo (kenlo.com.br)
- Na tabela comercial do Kenlo Imob, a **API aberta para clientes** consta apenas no plano **K²**; não está nos planos Prime ou K (kenlo.com.br/produtos/imob, kenlo.com.br/integre-conosco).
- O programa **"Integre Conosco"** é um processo de avaliação/homologação para empresas de tecnologia, distinto da API aberta do plano K² (kenlo.com.br/integre-conosco).
- O Kenlo Imob gera **links de integração** em *Imóveis > Portais* para envio de anúncios a portais (artigo de suporte da Kenlo). O formato desses links/arquivos **não foi confirmado** aqui.

## NÃO confirmado (exige a Kenlo / documentação sob contrato)
Endpoints e URL base, autenticação, nomes e tipos de campos, paginação, webhooks, limites de requisição, formato do feed XML, nome oficial/versão de "Mundo-K"/"GaiaWebService". Nada disso foi inventado no código.

## O que existe no código
- `src/lib/kenlo/types.ts`: contrato `PropertyProvider` e formato intermediário `RawSourceProperty` (definido pelo projeto, não pela Kenlo).
- `src/lib/kenlo/client.ts`: sem variáveis `KENLO_*` usa o provider **mock**; com variáveis, usa um provider que **falha explicitamente** até ser implementado.
- `src/lib/kenlo/normalize.ts`: validação Zod + normalização (zero/ausente → `null`).
- `src/lib/kenlo/sync.ts`: upsert por `kenloId`, deduplicação, despublicação de itens ausentes, log e resumo.
- `POST /api/kenlo/sync` (Bearer `CRON_SECRET`) para disparo agendado. Frequência só após confirmar limites.

## Próximos passos
1. Confirmar com a Kenlo o plano contratado (API aberta = K²) e solicitar documentação/credenciais.
2. Implementar `KenloProvider.fetchAll()` mapeando campos oficiais → `RawSourceProperty`.
3. Implementar `PropertyRepository` em PostgreSQL (`src/lib/database/schema.sql`) e trocar o repositório em memória.
4. Se houver webhooks, criar rota de eventos chamando o mesmo `upsertByKenloId`.
