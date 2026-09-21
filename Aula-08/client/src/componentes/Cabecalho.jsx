import { Link } from "react-router-dom";

// TODO (Aula 08): importe { Link } de "react-router-dom" e troque as
// duas tags <a href="..."> abaixo por <Link to="...">. Visualmente não
// muda nada — a diferença é que <Link> navega SEM recarregar a página
// inteira (o React Router troca só o conteúdo das rotas).
function Cabecalho() {
  return (
    <header className="cabecalho">
      <link to="/" className="cabecalho__logo">
        📍 Avaliações
      </link>
      <nav className="cabecalho__nav">
        <link to="/">Lugares</link>
      </nav>
    </header>
  );
}

export default Cabecalho;
