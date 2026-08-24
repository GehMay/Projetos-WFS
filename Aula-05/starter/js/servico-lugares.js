// "Serviço" de acesso a dados. Hoje busca arquivos JSON estáticos, mas a
// ideia é que a assinatura das funções (recebem nada ou um id, retornam
// uma Promise com os dados) seja a MESMA que a aula 07 vai usar para
// falar com a API de verdade feita em Express (aula 09+).

var BASE_DADOS = "dados/";

/**
 * Busca a lista de lugares.
 * @returns {Promise<Array>} lista de lugares
 * @throws {Error} se a resposta HTTP não for bem-sucedida (ok === false)
 */
async function buscarLugares() {
  const resposta = await fetch(BASE_DADOS + "lugares.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os lugares (HTTP " + resposta.status + ")");
  }
  return resposta.json();
}

/**
 * Busca a lista de avaliações.
 * @returns {Promise<Array>} lista de avaliações
 * @throws {Error} se a resposta HTTP não for bem-sucedida (ok === false)
 */
async function buscarAvaliacoes() {
  const resposta = await fetch(BASE_DADOS + "avaliacoes.json");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as avaliações (HTTP " + resposta.status + ")");
  }
  return resposta.json();
}

/**
 * Usada para demonstrar o tratamento de erro: busca um arquivo que não
 * existe, então o fetch resolve com `resposta.ok === false` (HTTP 404).
 */
async function buscarCaminhoInexistente() {
  const resposta = await fetch(BASE_DADOS + "arquivo-que-nao-existe.json");
  if (!resposta.ok) {
    throw new Error("Recurso não encontrado (HTTP " + resposta.status + ")");
  }
  return resposta.json();
}
