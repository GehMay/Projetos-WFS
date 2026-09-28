/**
 * Exibe uma nota (0 a `max`) como estrelas preenchidas/vazias.
 * Componente "burro": só recebe dados via props e renderiza — não sabe
 * de onde a nota veio nem o que fazer quando alguém clica nela.
 */
function Estrelas({ nota, max = 5 }) {
  const notaArredondada = Math.round(nota);

  return (
    <span className="estrelas" aria-label={`${nota} de ${max} estrelas`}>
      {Array.from({ length: max }, (_, indice) => (
        <span key={indice} aria-hidden="true">
          {indice < notaArredondada ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export default Estrelas;
