class Lugar {
  constructor(id, nome, categoria, cidade, descricao) {
    if(typeof nome !== "string" || nome.trim().length <= 2){
      throw new ErroValidacao("Nome do Lugar deve ter pelo menos 2 caracteres...", "nome");
    }
    if (typeof categoria !== "string" || categoria.trim().length === 0) {
      throw new ErroValidacao("Categoria é obrigatória", "categoria");
    }
    if(typeof cidade !== "string" || cidade.trim().length === 0 || cidade.trim().length <= 2){
      throw new ErroValidacao("O nome da cidade deve ter pelo menos 2 caracteres", "cidade")
    }
    if(typeof descricao !== "string" || descricao.trim().length === 0){
      throw new ErroValidacao("A descrição é obrigatória", "descricao")
    }
    this.id = id;
    this.nome = nome.trim();
    this.categoria = categoria.trim();
    this.cidade = cidade.trim();
    this.descricao = descricao.trim();
  }
}
// TODO (Aula 05): valide os parâmetros ANTES de atribuir qualquer
// coisa a `this`. Para cada regra abaixo, se ela for violada, lance
// `new ErroValidacao(mensagem, nomeDoCampo)`:
//
//   - nome: precisa ser string com pelo menos 2 caracteres (use
//     .trim() para ignorar espaços nas pontas)
//   - categoria: precisa ser uma string não vazia
//   - cidade: precisa ser uma string não vazia
//   - descricao: precisa ser uma string não vazia
//
// Se passar em todas as validações, atribua os campos (this.id,
// this.nome, this.categoria, this.cidade, this.descricao) — de
// preferência já "limpos" com .trim() nos textos.