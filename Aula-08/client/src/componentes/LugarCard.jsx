import Estrelas from "./Estrelas";
import { ICONES_CATEGORIA } from "../data/iconesCategoria";

/**
 * Card de um único lugar. Recebe o objeto `lugar` inteiro via props —
 * evitamos "explodir" o objeto em vários props soltos (nome, cidade...)
 * porque o card sempre precisa de todos os campos juntos.
 */
function LugarCard({ lugar }) {
  return (
    <article className="card" data-categoria={lugar.categoria.toLowerCase()}>
      <div className="card-banner" aria-hidden="true">
        {ICONES_CATEGORIA[lugar.categoria] ?? "📍"}
      </div>
      <div className="card-body">
        <span className="badge">{lugar.categoria}</span>
        <h2 className="card-title">{lugar.nome}</h2>
        <p className="card-cidade">📍 {lugar.cidade}</p>
        <p className="card-descricao">{lugar.descricao}</p>
        <Estrelas nota={lugar.notaMedia} />
        {/*
          TODO (Aula 08): importe { Link } de "react-router-dom" e
          troque a tag <a> abaixo por <Link to={`/lugares/${lugar.id}`}>
          — assim navegar para o detalhe não recarrega a página.
        */}
        <a className="card-link" href={`/lugares/${lugar.id}`}>
          Ver detalhes
        </a>
      </div>
    </article>
  );
}

export default LugarCard;
