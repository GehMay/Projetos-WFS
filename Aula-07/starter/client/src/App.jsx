import { useEffect, useState } from "react";
import ListaLugares from "./components/ListaLugares";
import FormularioAvaliacao from "./components/FormularioAvaliacao";
import { buscarLugares, buscarAvaliacoes } from "./servicos/servicoLugares";
import { calcularMedia, filtrarPorLugar } from "./utilitarios/avaliacoes";

function App() {
  const [lugares, setLugares] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // TODO (Aula 07): busque os dados dentro do useEffect (que roda uma
    // vez, na montagem do componente, por causa do array de
    // dependências vazio `[]` no final).
    //
    // 1. Declare uma função async `carregarDados` (não dá para marcar o
    //    próprio callback do useEffect como async).
    // 2. Dentro dela: setCarregando(true), setErro(null); depois, em um
    //    try/catch:
    //    - use Promise.all([buscarLugares(), buscarAvaliacoes()]) com
    //      await para buscar os dois de uma vez
    //    - em caso de sucesso: setLugares(...) e setAvaliacoes(...)
    //    - em caso de erro: setErro(erro.message)
    //    - no finally: setCarregando(false)
    // 3. Chame carregarDados() (a função declarada acima).
    //
    // Dica: sem isso, `carregando` nunca vira `false` e a tela fica
    // presa em "Carregando lugares..." para sempre — é assim que você
    // vai saber que ainda falta implementar este trecho.
  }, []);

  function lidarComNovaAvaliacao(lugarId, { nota, comentario }) {
    // TODO (Aula 07): adicione a nova avaliação ao estado `avaliacoes`
    // (setAvaliacoes), criando um novo objeto com um `id` único (dica:
    // Date.now()), o `lugarId` recebido, um `usuarioId` fixo (ex: 0,
    // já que ainda não existe login) e os campos `nota`/`comentario`
    // recebidos. Lembre-se: nunca modifique o array anterior
    // diretamente — crie um novo com o spread (`[...atual, novoItem]`).
  }

  const lugaresComNota = lugares.map((lugar) => ({
    ...lugar,
    notaMedia: calcularMedia(filtrarPorLugar(avaliacoes, lugar.id)),
  }));

  return (
    <>
      <header className="cabecalho">
        <a href="/" className="cabecalho__logo">
          📍 Avaliações
        </a>
        <nav className="cabecalho__nav">
          <a href="/">Lugares</a>
        </nav>
      </header>

      <main className="container">
        <h1 className="titulo-pagina">Lugares avaliados</h1>
        <p className="subtitulo-pagina">
          Descubra e avalie lugares recomendados pela comunidade.
        </p>

        {carregando && <p className="estado-carregando">Carregando lugares...</p>}
        {erro && <p className="estado-erro">⚠️ {erro}</p>}

        {!carregando && !erro && (
          <>
            <ListaLugares lugares={lugaresComNota} />

            <section className="secao-teste">
              <h2>Avaliar um lugar</h2>
              <FormularioAvaliacao lugares={lugares} aoEnviar={lidarComNovaAvaliacao} />
            </section>
          </>
        )}
      </main>

      <footer className="rodape">Projeto de referência do curso &middot; Aula 07</footer>
    </>
  );
}

export default App;
