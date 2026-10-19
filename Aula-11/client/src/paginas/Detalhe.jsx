import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Estrelas from "../componentes/Estrelas";
import FormularioAvaliacao from "../componentes/FormularioAvaliacao";
import NaoEncontrada from "./NaoEncontrada";
import { ICONES_CATEGORIA } from "../data/iconesCategoria";
import { buscarLugares, buscarAvaliacoes } from "../servicos/servicoLugares";
import { calcularMedia, filtrarPorLugar } from "../utilitarios/avaliacoes";

function Detalhe() {
  const { id } = useParams();
  const lugarId = Number(id);

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

  function lidarComNovaAvaliacao({ nota, comentario }) {
    setAvaliacoes((atual) => [
      ...atual,
      { id: Date.now(), lugarId, usuarioId: 0, nota, comentario },
    ]);
  }

  if (carregando) {
    return (
      <main className="container">
        <p className="estado-carregando">Carregando lugar...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="container">
        <p className="estado-erro">⚠️ {erro}</p>
      </main>
    );
  }

  const lugar = lugares.find((item) => item.id === lugarId);

  if (!lugar) {
    return <NaoEncontrada />;
  }

  const avaliacoesDoLugar = filtrarPorLugar(avaliacoes, lugarId);
  const media = calcularMedia(avaliacoesDoLugar);

  return (
    <main className="container">
      <Link className="link-voltar" to="/">
        &larr; Voltar para lugares
      </Link>

      <div className="detalhe">
        <section className="detalhe-principal">
          <div className="detalhe-banner" data-categoria={lugar.categoria.toLowerCase()}>
            {ICONES_CATEGORIA[lugar.categoria] ?? "📍"}
          </div>
          <span className="badge">{lugar.categoria}</span>
          <h1 className="detalhe-titulo">{lugar.nome}</h1>
          <p className="detalhe-cidade">📍 {lugar.cidade}</p>
          <p className="detalhe-descricao">{lugar.descricao}</p>
        </section>

        <aside className="detalhe-resumo">
          <h2>Nota média</h2>
          <p className="nota-media">
            {media || "—"} <Estrelas nota={media} />
          </p>
          <p className="total-avaliacoes">
            Baseado em {avaliacoesDoLugar.length} avaliação(ões)
          </p>
        </aside>

        <section className="detalhe-avaliacoes">
          <h2>Avaliações</h2>
          {avaliacoesDoLugar.length === 0 ? (
            <p>Ainda não há avaliações para este lugar.</p>
          ) : (
            <ul className="lista-avaliacoes">
              {avaliacoesDoLugar.map((avaliacao) => (
                <li key={avaliacao.id} className="avaliacao-item">
                  <div className="avaliacao-cabecalho">
                    <Estrelas nota={avaliacao.nota} />
                  </div>
                  <p>{avaliacao.comentario}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="secao-teste">
          <h2>Avaliar este lugar</h2>
          <FormularioAvaliacao aoEnviar={lidarComNovaAvaliacao} />
        </section>
      </div>
    </main>
  );
}

export default Detalhe;
