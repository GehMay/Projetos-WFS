/**
 * Exibe uma nota (0 a `max`) como estrelas preenchidas/vazias.
 * Componente "burro": só recebe dados via props e renderiza — não sabe
 * de onde a nota veio nem o que fazer quando alguém clica nela.
 */
function Estrelas({ nota, max = 5 }) {
  // TODO (Aula 06):
  // 1. Arredonde `nota` para o inteiro mais próximo (Math.round) — essa
  //    é a quantidade de estrelas "cheias" (★).
  // 2. Gere um array com `max` posições (dica: Array.from({ length: max })).
  // 3. Para cada posição `indice`, renderize "★" se `indice` for menor
  //    que o arredondado, ou "☆" caso contrário.
  // 4. Envolva tudo em um <span className="estrelas"> com um
  //    aria-label descrevendo a nota (ex: "4 de 5 estrelas") para
  //    acessibilidade.
  const noatArredondada = Math.round(nota);
  return (
  <span className="estrelas" aria-label={`${nota} de ${max} estrelas`}>
      {Array.from({length: max}, (_, indice) =>(
        <span key = {indice} aria-hidden="true">
         {indice < noatArredondada ? "★" : "☆"}
        </span>
      ))}
    </span>
  )
}

export default Estrelas;
