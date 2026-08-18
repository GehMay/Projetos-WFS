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
  // TODO (Aula 04):
  // 1. Use `fetch(BASE_DADOS + "lugares.json")` e `await` o resultado.
  // 2. Se `resposta.ok` for falso, lance um Error com uma mensagem
  //    explicando o problema (inclua `resposta.status` na mensagem).
  // 3. Caso contrário, retorne `resposta.json()` (essa chamada também
  //    retorna uma Promise, então pode usar `return resposta.json()`
  //    sem `await`).
  //Permite que a função trabalhe com funções demoradas, sem travar o resto do projeto, "Trabalha em segundo plano"
  const resposta = await fetch(BASE_DADOS + "lugares.json");
  if(!resposta.ok){
    throw new Error("Não foi possível carregar os Lugares!!!(HTTP " + resposta.status +")")
  }
  return resposta.json()
}

/**
 * Busca a lista de avaliações.
 * @returns {Promise<Array>} lista de avaliações
 * @throws {Error} se a resposta HTTP não for bem-sucedida (ok === false)
 */
async function buscarAvaliacoes() {
  // TODO (Aula 04): igual à função acima, mas buscando
  // BASE_DADOS + "avaliacoes.json".
  const resposta = await fetch(BASE_DADOS + "avaliacoes.json");
  if(!resposta.ok){
    throw new Error("Não foi possível carregar as Avaliações!!!(HTTP " + resposta.status +")")
  }
  return resposta.json()
}

/**
 * Usada para demonstrar o tratamento de erro: busca um arquivo que não
 * existe, então o fetch resolve com `resposta.ok === false` (HTTP 404).
 */
async function buscarCaminhoInexistente() {
  // TODO (Aula 04): busque BASE_DADOS + "arquivo-que-nao-existe.json" e
  // lance um Error quando a resposta não for `ok`. Isso vai alimentar o
  // botão "Simular erro (404)" da página.
  const resposta = await fetch(BASE_DADOS + "arquivo-que-nao-existe.json");
  if(!resposta.ok){
    throw new Error("Recurso não encontrado!!!(HTTP " + resposta.status +")")
  }
  return resposta.json()
}
