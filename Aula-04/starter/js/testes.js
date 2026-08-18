// Página de demonstração/teste das funções utilitárias da aula 03.
// Não usamos nenhum framework de testes — só funções simples que
// verificam uma condição e imprimem o resultado na tela e no console.
//
// Cada seção é isolada com try/catch: se uma função ainda não foi
// implementada (ou tem um bug), o erro aparece na tela em vez de travar
// a renderização das seções seguintes.

function el(id) {
  return document.getElementById(id);
}

function renderizarTodas() {
  var ul = el("lista-todas");
  avaliacoesMock.forEach(function (a) {
    var li = document.createElement("li");
    li.textContent =
      "#" + a.id + " — lugar " + a.lugarId + " — nota " + a.nota + " — \"" + a.comentario + "\"";
    ul.appendChild(li);
  });
}

function renderizarMedia() {
  el("media-geral").textContent = calcularMedia(avaliacoesMock);
  el("media-cafe-aroma").textContent = calcularMedia(filtrarPorLugar(avaliacoesMock, 1));
}

function renderizarFiltradas() {
  var filtradas = filtrarPorNotaMinima(avaliacoesMock, 4);
  var ul = el("lista-filtradas");
  filtradas.forEach(function (a) {
    var li = document.createElement("li");
    li.textContent = "#" + a.id + " — nota " + a.nota + " — \"" + a.comentario + "\"";
    ul.appendChild(li);
  });
}

function renderizarOrdenadas() {
  var ordenadas = ordenarPorNota(avaliacoesMock, "desc");
  var ul = el("lista-ordenadas");
  ordenadas.forEach(function (a) {
    var li = document.createElement("li");
    li.textContent = "nota " + a.nota + " — \"" + a.comentario + "\"";
    ul.appendChild(li);
  });
}

/**
 * Executa `verificar` (uma função sem argumentos que deve retornar um
 * booleano) e registra o resultado em `lista`. Se `verificar` lançar uma
 * exceção (por exemplo, porque a função testada ainda não foi
 * implementada), o teste é registrado como reprovado em vez de travar
 * a execução dos testes seguintes.
 */
function afirmar(lista, descricao, verificar) {
  var passou = false;
  var mensagemErro = null;
  try {
    passou = !!verificar();
  } catch (erro) {
    passou = false;
    mensagemErro = erro.message;
  }
  lista.push({ descricao: descricao, passou: passou, mensagemErro: mensagemErro });
}

function rodarAsserts() {
  var resultados = [];

  afirmar(resultados, "calcularMedia([]) deve ser 0", function () {
    return calcularMedia([]) === 0;
  });

  afirmar(resultados, "calcularMedia de notas [5, 4] deve ser 4.5", function () {
    return calcularMedia([{ nota: 5 }, { nota: 4 }]) === 4.5;
  });

  afirmar(resultados, "filtrarPorLugar(1) só retorna avaliações do lugar 1", function () {
    return filtrarPorLugar(avaliacoesMock, 1).every(function (a) {
      return a.lugarId === 1;
    });
  });

  afirmar(resultados, "filtrarPorNotaMinima(4) não retorna nenhuma nota menor que 4", function () {
    return filtrarPorNotaMinima(avaliacoesMock, 4).every(function (a) {
      return a.nota >= 4;
    });
  });

  afirmar(resultados, "ordenarPorNota('desc') coloca a maior nota primeiro", function () {
    var ordenadasDesc = ordenarPorNota(avaliacoesMock, "desc");
    return ordenadasDesc[0].nota >= ordenadasDesc[ordenadasDesc.length - 1].nota;
  });

  afirmar(
    resultados,
    "ordenarPorNota não modifica o array original (retorna uma cópia)",
    function () {
      var originalAntes = JSON.stringify(avaliacoesMock);
      ordenarPorNota(avaliacoesMock, "asc");
      return JSON.stringify(avaliacoesMock) === originalAntes;
    }
  );

  var ul = el("lista-testes");
  resultados.forEach(function (r) {
    var li = document.createElement("li");
    li.className = "resultado-teste " + (r.passou ? "ok" : "falha");
    li.textContent =
      (r.passou ? "✅ " : "❌ ") + r.descricao + (r.mensagemErro ? " (erro: " + r.mensagemErro + ")" : "");
    ul.appendChild(li);
    console.assert(r.passou, r.descricao);
  });
}

function executarComTratamento(fn, nomeSecaoId) {
  try {
    fn();
  } catch (erro) {
    var alvo = nomeSecaoId && el(nomeSecaoId);
    if (alvo) {
      var li = document.createElement("li");
      li.className = "resultado-teste falha";
      li.textContent = "❌ Erro ao renderizar esta seção: " + erro.message;
      alvo.appendChild(li);
    }
    console.error(erro);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  executarComTratamento(renderizarTodas, "lista-todas");
  executarComTratamento(renderizarMedia, null);
  executarComTratamento(renderizarFiltradas, "lista-filtradas");
  executarComTratamento(renderizarOrdenadas, "lista-ordenadas");
  executarComTratamento(rodarAsserts, "lista-testes");
});
