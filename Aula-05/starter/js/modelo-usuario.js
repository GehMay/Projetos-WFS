class Usuario {
  constructor(id, nome, email, senhaHash) {
    if(typeof nome !== "string" || nome.trim().length < 2){
      throw new ErroValidacao("O nome do Usuário deve ter no mínimo dois caracteres e no máximo 15 caracteres", "nome");
    }
    if(typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      throw new ErroValidacao("Email Inválido", "email");
    }
    if(typeof senhaHash !== "string" || senhaHash.trim().length === 0){
      throw new ErroValidacao("SenhaHash é obrigatório (a senha em temto puro nunca, jamais, em hipóteses alguma deve ser armazenada em texto puro)", "senhaHesh");
    }
    this.id = id;
    this.nome = nome.trim();
    this.email = email.trim().toLowerCase();
    this.senhaHash = senhaHase.trim();
  }
}
// TODO (Aula 05): valide antes de atribuir a `this`, lançando
// `new ErroValidacao(mensagem, nomeDoCampo)` quando necessário:
//
//   - nome: string com pelo menos 2 caracteres
//   - email: precisa "parecer" um email válido — dica: regex
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   - senhaHash: string não vazia (NUNCA guarde a senha em texto
//     puro aqui — o hash de verdade só vai existir a partir da
//     aula 11, com bcrypt no backend)
//
// Se passar, atribua this.id, this.nome, this.email (dica: pode
// normalizar para minúsculas) e this.senhaHash.

// Tudo dentro de duas barras / é uma expressão regular (ou regex literal) em JavaScript. Expressões regulares são padrões usados para buscar, validar ou manipular textos.