import { useState } from "react";

/**
 * Formulário controlado: cada campo tem seu valor guardado no state do
 * React (`value` + `onChange`), então o React é a "fonte da verdade"
 * do que está na tela — nunca lemos o DOM diretamente.
 */
function FormularioAvaliacao({ lugares, aoEnviar }) {
  const[lugarId, setLugarID] = useState(lugares[0]?.id ?? "")
  const[nota, setNota] = useState(5)
  const[comentario, setComentario] = useState("")
  const[erro, setErro] = useState(null)
  function lidarComEnvio(evento){
    evento.preventDefault()
    if(!lugarId){
      setErro("Escolha um Lugar")
      return;
    }
    if(comentario.trim().length < 3){
      setErro("o comentário precisa ter pelomenos 3 caracteres")
      return
    }
    setErro(null)
    aoEnviar(Number(lugarId),{nota: Number(nota), comentario: comentario.trim()})
    setComentario("")
    setNota(5)
  }
  return (
    <form className="formulario" onSubmit={lidarComEnvio}>
      <div className="campo-formulario">
        <label htmlFor="">Lugar</label>
        <select id="campo-lugar" value={lugarId} onChange={(e) => setLugarID(e.target.value)}>
          {lugares.map((lugar) => (
            <option key={lugar.id} value={lugar.id}>
              {lugar.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="campo-formulario">
        <label htmlFor="campo-nota">Nota</label>
        <select id="campo-nota" value={nota} onChange={(e)=>setNota(e.target.value)}>
          {[5,4,3,2,1].map((valor) => (
            <option key={valor} value={valor}>
              {valor}{valor === 1 ? " estrela" : " estrelas"}
            </option>
          ))}
        </select>
      </div>
      <div className="campo-formulario">
        <label htmlFor="campo-comentario">
          <textarea
          id="campo-comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={3}
          placeholder="Conte como foi sua experiência"
          />
        </label>
      </div>
      {erro && <p className="estado-erro">{erro}</p>}
      <button type="submit" className="botao">
        Enviar Avaliação
      </button>
    </form>
  )
  // TODO (Aula 07):
  // 1. Crie um estado para cada campo do formulário com useState:
  //    - lugarId (inicial: lugares[0]?.id ?? "")
  //    - nota (inicial: 5)
  //    - comentario (inicial: "")
  //    - erro (inicial: null) — para mostrar mensagens de validação
  //
  // 2. Crie uma função `lidarComEnvio(evento)` que:
  //    - chama evento.preventDefault() (senão a página recarrega)
  //    - valida: lugarId precisa existir, comentario precisa ter pelo
  //      menos 3 caracteres (trim().length >= 3) — se inválido, chame
  //      setErro(mensagem) e pare (return) sem chamar aoEnviar
  //    - se válido: chame setErro(null), depois
  //      aoEnviar(Number(lugarId), { nota: Number(nota), comentario })
  //      e limpe o campo comentario (volte para "")
  //
  // 3. Monte o JSX com um <form onSubmit={lidarComEnvio}>:
  //    - um <select> controlado (value={lugarId} onChange=...) listando
  //      `lugares.map(lugar => <option value={lugar.id}>{lugar.nome}</option>)`
  //    - um <select> controlado para a nota (1 a 5)
  //    - um <textarea> controlado para o comentário
  //    - se `erro` não for null, mostre <p className="estado-erro">
  //    - um <button type="submit" className="botao">Enviar avaliação</button>
  //
  // Dica: todo campo controlado segue o padrão
  //   value={estado} onChange={(e) => setEstado(e.target.value)}
}

export default FormularioAvaliacao;
