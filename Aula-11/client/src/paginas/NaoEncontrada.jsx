import { Link } from "react-router-dom";

function NaoEncontrada() {
  return (
    <main className="container">
      <h1 className="titulo-pagina">404</h1>
      <p className="subtitulo-pagina">
        Não encontramos o que você está procurando.
      </p>
      <Link className="card-link" to="/">
        Voltar para lugares
      </Link>
    </main>
  );
}

export default NaoEncontrada;
