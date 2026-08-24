function elModelos(id) {
  return document.getElementById(id);
}

function afirmarModelo(lista, descricao, verificar) {
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

/** Espera que `fn()` lance um ErroValidacao no campo `campoEsperado`. */
function lancaErroValidacaoNoCampo(fn, campoEsperado) {
  try {
    fn();
    return false; // não lançou nada — a validação falhou em barrar um dado inválido
  } catch (erro) {
    return erro instanceof ErroValidacao && erro.campo === campoEsperado;
  }
}

function rodarTestesModelos() {
  var resultados = [];

  // ---- Lugar ----
  afirmarModelo(resultados, "Lugar válido é criado sem lançar erro", function () {
    var lugar = new Lugar(1, "Café Aroma", "Cafeteria", "São Paulo", "Ótimo café.");
    return lugar.nome === "Café Aroma";
  });

  afirmarModelo(resultados, "Lugar com nome muito curto lança ErroValidacao no campo 'nome'", function () {
    return lancaErroValidacaoNoCampo(function () {
      new Lugar(1, "C", "Cafeteria", "São Paulo", "Ótimo café.");
    }, "nome");
  });

  // ---- Usuario ----
  afirmarModelo(resultados, "Usuario válido é criado sem lançar erro", function () {
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    return usuario.email === "marina@example.com";
  });

  afirmarModelo(resultados, "Usuario com email inválido lança ErroValidacao no campo 'email'", function () {
    return lancaErroValidacaoNoCampo(function () {
      new Usuario(1, "Marina Souza", "nao-e-um-email", "hash123");
    }, "email");
  });

  // ---- Avaliacao ----
  afirmarModelo(resultados, "Avaliação válida (nota 1 a 5) é criada sem lançar erro", function () {
    var lugar = new Lugar(1, "Café Aroma", "Cafeteria", "São Paulo", "Ótimo café.");
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    var avaliacao = new Avaliacao(1, 5, "Excelente!", lugar, usuario);
    return avaliacao.nota === 5;
  });

  afirmarModelo(resultados, "Avaliação com nota 0 lança ErroValidacao no campo 'nota'", function () {
    var lugar = new Lugar(1, "Café Aroma", "Cafeteria", "São Paulo", "Ótimo café.");
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    return lancaErroValidacaoNoCampo(function () {
      new Avaliacao(1, 0, "Excelente!", lugar, usuario);
    }, "nota");
  });

  afirmarModelo(resultados, "Avaliação com nota 6 lança ErroValidacao no campo 'nota'", function () {
    var lugar = new Lugar(1, "Café Aroma", "Cafeteria", "São Paulo", "Ótimo café.");
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    return lancaErroValidacaoNoCampo(function () {
      new Avaliacao(1, 6, "Excelente!", lugar, usuario);
    }, "nota");
  });

  afirmarModelo(resultados, "Avaliação com nota decimal (4.5) lança ErroValidacao no campo 'nota'", function () {
    var lugar = new Lugar(1, "Café Aroma", "Cafeteria", "São Paulo", "Ótimo café.");
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    return lancaErroValidacaoNoCampo(function () {
      new Avaliacao(1, 4.5, "Excelente!", lugar, usuario);
    }, "nota");
  });

  afirmarModelo(resultados, "Avaliação sem um Lugar de verdade lança ErroValidacao no campo 'lugar'", function () {
    var usuario = new Usuario(1, "Marina Souza", "marina@example.com", "hash123");
    return lancaErroValidacaoNoCampo(function () {
      new Avaliacao(1, 5, "Excelente!", { nome: "Não é um Lugar" }, usuario);
    }, "lugar");
  });

  var ul = elModelos("lista-testes-modelos");
  resultados.forEach(function (r) {
    var li = document.createElement("li");
    li.className = "resultado-teste " + (r.passou ? "ok" : "falha");
    li.textContent =
      (r.passou ? "✅ " : "❌ ") + r.descricao + (r.mensagemErro ? " (erro: " + r.mensagemErro + ")" : "");
    ul.appendChild(li);
    console.assert(r.passou, r.descricao);
  });
}

document.addEventListener("DOMContentLoaded", rodarTestesModelos);
