import Estrelas from "./Estrelas";
import { ICONES_CATEGORIA } from "../data/lugaresMock";

/**
 * Card de um único lugar. Recebe o objeto `lugar` inteiro via props —
 * evitamos "explodir" o objeto em vários props soltos (nome, cidade...)
 * porque o card sempre precisa de todos os campos juntos.
 */
function LugarCard({ lugar }) {
  // TODO (Aula 06): monte o card usando as MESMAS classes CSS do site
  // estático das aulas 01-02 (já prontas em src/index.css), agora como
  // JSX:
  return (
    <article className="card" data-categoria={lugar.categoria.toLowerCase()}>
      <div className="card-banner">
        {ICONES_CATEGORIA[lugar.categoria] ?? "📍"}
      </div>
      <div className="card-body">
        <span className="badge">{lugar.categoria}</span>
        <h2 className="card-title">{lugar.nome}</h2>
        <p className="card-cidade">📍 {lugar.cidade}</p>
        <p className="card-descricao">{lugar.descricao}</p>
        <Estrelas nota={lugar.notaMedia} />
        <a className="card-link" href={`#/lugares/${lugar.id}`}>Ver detalhes</a>
      </div>
    </article>
  )

  // Dica: se ICONES_CATEGORIA[lugar.categoria] não existir, use "📍"
  // como ícone padrão (operador ??).
}

export default LugarCard;
