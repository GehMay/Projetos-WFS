import ListaLugares from "./components/ListaLugares";
import { lugaresMock } from "./data/lugaresMock";
import Teste from "./components/Teste";

function App() {
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
        <Teste/>
        <ListaLugares lugares={lugaresMock} />
      </main>

      <footer className="rodape">Projeto de referência do curso &middot; Aula 06</footer>
    </>
  );
}

export default App;
