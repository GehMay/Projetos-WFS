import { useState } from "react";

/**
 * Formulário controlado: cada campo tem seu valor guardado no state do
 * React (`value` + `onChange`), então o React é a "fonte da verdade"
 * do que está na tela — nunca lemos o DOM diretamente. Vive na página
 * de detalhe; quem chama `aoEnviar` já sabe para qual lugar é a
 * avaliação, então este componente só cuida de nota/comentário.
 */
function FormularioAvaliacao({ aoEnviar }) {
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [erro, setErro] = useState(null);

  function lidarComEnvio(evento) {
    evento.preventDefault();

    if (comentario.trim().length < 3) {
      setErro("O comentário precisa ter pelo menos 3 caracteres.");
      return;
    }

    setErro(null);
    aoEnviar({ nota: Number(nota), comentario: comentario.trim() });
    setComentario("");
    setNota(5);
  }

  return (
    <form className="formulario" onSubmit={lidarComEnvio}>
      <div className="campo-formulario">
        <label htmlFor="campo-nota">Nota</label>
        <select id="campo-nota" value={nota} onChange={(e) => setNota(e.target.value)}>
          {[5, 4, 3, 2, 1].map((valor) => (
            <option key={valor} value={valor}>
              {valor} {valor === 1 ? "estrela" : "estrelas"}
            </option>
          ))}
        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="campo-comentario">Comentário</label>
        <textarea
          id="campo-comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={3}
          placeholder="Conte como foi sua experiência..."
        />
      </div>

      {erro && <p className="estado-erro">⚠️ {erro}</p>}

      <button type="submit" className="botao">
        Enviar avaliação
      </button>
    </form>
  );
}

export default FormularioAvaliacao;
