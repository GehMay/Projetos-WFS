import { useEffect, useState } from "react";
import ListaLugares from "../componentes/ListaLugares";
import { buscarLugares, buscarAvaliacoes } from "../servicos/servicoLugares";
import { calcularMedia, filtrarPorLugar } from "../utilitarios/avaliacoes";

function Home() {
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

  const lugaresComNota = lugares.map((lugar) => ({
    ...lugar,
    notaMedia: calcularMedia(filtrarPorLugar(avaliacoes, lugar.id)),
  }));

  return (
    <main className="container">
      <h1 className="titulo-pagina">Lugares avaliados</h1>
      <p className="subtitulo-pagina">
        Descubra e avalie lugares recomendados pela comunidade.
      </p>

      {carregando && <p className="estado-carregando">Carregando lugares...</p>}
      {erro && <p className="estado-erro">⚠️ {erro}</p>}
      {!carregando && !erro && <ListaLugares lugares={lugaresComNota} />}
    </main>
  );
}

export default Home;
