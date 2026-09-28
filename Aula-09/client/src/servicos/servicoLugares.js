// Mesma ideia da aula 04: um "serviço" que sabe buscar dados e devolve
// Promises. Hoje busca arquivos estáticos em /dados (pasta `public/`),
// mas a assinatura das funções é igual à que a aula 09+ vai usar para
// falar com a API Express de verdade.

const BASE_DADOS = "/dados/";

export async function buscarLugares() {
  const resposta = await fetch(BASE_DADOS + "lugares.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os lugares (HTTP " + resposta.status + ")");
  }
  return resposta.json();
}

export async function buscarAvaliacoes() {
  const resposta = await fetch(BASE_DADOS + "avaliacoes.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as avaliações (HTTP " + resposta.status + ")");
  }
  return resposta.json();
}
