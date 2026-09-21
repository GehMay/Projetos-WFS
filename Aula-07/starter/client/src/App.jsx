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
    let cancelado = false;

    async function carregarDados() {
      setCarregando(true);
      setErro(null);
      try {
        const [listaLugares, listaAvaliacoes] = await Promise.all([
          buscarLugares(),
          buscarAvaliacoes(),
        ]);
        if (!cancelado) {
          setLugares(listaLugares);
          setAvaliacoes(listaAvaliacoes);
        }
      } catch (erroCapturado) {
        if (!cancelado) {
          setErro(erroCapturado.message);
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      cancelado = true;
    };
  }, []);

  function lidarComNovaAvaliacao(lugarId, { nota, comentario }) {
    setAvaliacoes((atual) => [
      ...atual,
      { id: Date.now(), lugarId, usuarioId: 0, nota, comentario },
    ]);
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
