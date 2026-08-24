// Erro customizado: em vez de lançar um Error genérico, as classes de
// modelo devem lançar ErroValidacao, que carrega também o nome do campo
// que falhou. Isso permite, por exemplo, destacar o campo errado em um
// formulário (aula 07) sem precisar analisar o texto da mensagem.

// TODO (Aula 05):
// 1. Chame super(mensagem) — isso é OBRIGATÓRIO em toda classe que
//    estende outra (aqui, Error) e deve ser a primeira linha do
//    construtor, antes de usar `this`.
// 2. Defina this.name = "ErroValidacao" (por padrão, herdaria o
//    nome genérico "Error").
// 3. Guarde o parâmetro `campo` em this.campo.


//class - Cria a clase
//extend - Herda de outra classe
//Error - Classe padrão de erro do JS
//Constructor - Executa quando usamos new
//new - Cria um objeto
//super() - chama o constructor da classi pai
//this - representa o objeto atual
//throw - Lança o erro
//instanceof - Verificação de qual classe o objeto veio

class ErroValidacao extends Error {
  constructor(mensagem, campo) {
    super(mensagem);
    this.name="ErroValidacao";
    this.campo= campo;
  }
}