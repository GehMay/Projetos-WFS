function el(id) {
  return document.getElementById(id);
}

function mostrarCarregando() {
  el("estado").className = "estado-carregando";
  el("estado").textContent = "Carregando dados...";
  el("resultado").innerHTML = "";
}

function mostrarErro(mensagem) {
  el("estado").className = "estado-erro";
  el("estado").textContent = "⚠️ " + mensagem;
  el("resultado").innerHTML = "";
}

function limparEstado() {
  el("estado").className = "";
  el("estado").textContent = "";
}

function renderizarLugares(lugares, avaliacoes) {
  limparEstado();
  var ul = el("resultado");
  ul.innerHTML = "";
  lugares.forEach(function (lugar) {
    var avaliacoesDoLugar = filtrarPorLugar(avaliacoes, lugar.id);
    var media = calcularMedia(avaliacoesDoLugar);
    var li = document.createElement("li");
    li.className = "resultado-teste ok";
    li.textContent =
      lugar.nome + " (" + lugar.categoria + ", " + lugar.cidade + ") — nota média: " +
      (media || "sem avaliações") + " — " + avaliacoesDoLugar.length + " avaliação(ões)";
    ul.appendChild(li);
  });
}

async function carregarDados() {
  mostrarCarregando();
  try {
    var lugares = await buscarLugares();
    var avaliacoes = await buscarAvaliacoes();
    renderizarLugares(lugares, avaliacoes);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

async function simularErro() {
  mostrarCarregando();
  try {
    await buscarCaminhoInexistente();
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  el("botao-carregar").addEventListener("click", carregarDados);
  el("botao-simular-erro").addEventListener("click", simularErro);
  carregarDados();
});
