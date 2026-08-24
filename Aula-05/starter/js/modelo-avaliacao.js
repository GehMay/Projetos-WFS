class Avaliacao {
  constructor(id, nota, comentario, lugar, usuario) {
    if(!Number.isInteger(nota) || nota < 1 || nota > 5){
      throw new ErroValidacao("Nota precisa ser um número inteiro entre 1 e 5", "nota");
    }
    if(typeof comentario !== "string" || comentario.trim().length < 3){
      throw new ErroValidacao("O comentário deve ter no mínimo três caracteres", "comentario")
    }
    if(!(lugar instanceof Lugar)){
      throw new ErroValidacao("A avaliação deve estar assocada a um lugar válido", "lugar")
    }
    if(!(usuario instanceof Usuario)){
      throw new ErroValidacao("A avaliação deve estar assocada a um usuário válido", "usuario")
    }
    this.id = id;
    this.nota = nota;
    this.comentario = comentario.trim();
    this.lugar = lugar;
    this.usuario = usuario;
  }
}
// TODO (Aula 05): valide antes de atribuir a `this`, lançando
// `new ErroValidacao(mensagem, nomeDoCampo)` quando necessário:
//
//   - nota: precisa ser um NÚMERO INTEIRO entre 1 e 5 (dica:
//     Number.isInteger(nota)) — notas decimais (ex: 4.5) ou fora
//     do intervalo devem ser rejeitadas
//   - comentario: string com pelo menos 3 caracteres
//   - lugar: precisa ser uma instância de Lugar (dica:
//     lugar instanceof Lugar)
//   - usuario: precisa ser uma instância de Usuario (dica:
//     usuario instanceof Usuario)
//
// Se passar, atribua this.id, this.nota, this.comentario,
// this.lugar e this.usuario.