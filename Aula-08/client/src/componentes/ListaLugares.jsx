import LugarCard from "./LugarCard";

/**
 * Renderiza a grade de lugares. Não sabe buscar dados nem lidar com
 * carregamento/erro (isso chega na aula 07) — só recebe um array e
 * desenha um LugarCard para cada item.
 */
function ListaLugares({ lugares }) {
  if (lugares.length === 0) {
    return <p>Nenhum lugar encontrado.</p>;
  }

  return (
    <div className="cards-grid">
      {lugares.map((lugar) => (
        <LugarCard key={lugar.id} lugar={lugar} />
      ))}
    </div>
  );
}

export default ListaLugares;
