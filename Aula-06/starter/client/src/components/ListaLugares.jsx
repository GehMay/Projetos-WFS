import LugarCard from "./LugarCard";

/**
 * Renderiza a grade de lugares. Não sabe buscar dados nem lidar com
 * carregamento/erro (isso chega na aula 07) — só recebe um array e
 * desenha um LugarCard para cada item.
 */
function ListaLugares({ lugares }) {
  // TODO (Aula 06):
  // 1. Se `lugares` estiver vazio, retorne algo como
  //    <p>Nenhum lugar encontrado.</p> em vez de uma grade vazia.
  // 2. Caso contrário, retorne um <div className="cards-grid"> com um
  //    <LugarCard key={lugar.id} lugar={lugar} /> para cada item de
  //    `lugares` (dica: Array.prototype.map). Não esqueça a `key` —
  //    o React precisa dela para listas.
  if(lugares.length === 0){
    return <p>Nenhum Lugar Encontrado</p>
  }

  return(
    <div className="cards-grid">
      {lugares.map((lugar) => (
        <LugarCard key={lugar.id} lugar={lugar}/>
      ))}
    </div>
  )
}

export default ListaLugares;
