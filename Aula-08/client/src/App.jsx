import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import Home from "./paginas/Home";
import Detalhe from "./paginas/Detalhe";
import NaoEncontrada from "./paginas/NaoEncontrada";

// TODO (Aula 08):
// 1. Importe { BrowserRouter, Routes, Route } de "react-router-dom"
//    (o pacote já está instalado — confira o package.json).
// 2. Envolva tudo em <BrowserRouter>.
// 3. Dentro dele, coloque <Cabecalho /> antes de <Routes> e
//    <Rodape /> depois — eles aparecem em TODAS as páginas.
// 4. Dentro de <Routes>, declare 3 <Route>:
//    - path="/" → element={<Home />}
//    - path="/lugares/:id" → element={<Detalhe />}  (o ":id" é um
//      parâmetro dinâmico — qualquer valor aí cai nessa rota)
//    - path="*" → element={<NaoEncontrada />}  (rota "coringa": pega
//      qualquer URL que não bateu com nenhuma rota acima — DEVE ser a
//      última <Route> da lista)
function App() {
  return (
    <>
      <Cabecalho />
      <Home />
      <Rodape />
    </>
  );
}

export default App;
