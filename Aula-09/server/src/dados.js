// "Banco de dados" em memória. Reinicia toda vez que o servidor
// reinicia — na aula 10 isso vira persistência de verdade no MySQL,
// mas o formato dos dados continua o mesmo.

export const lugares = [
  { id: 1, nome: "Café Aroma", categoria: "Cafeteria", cidade: "São Paulo", descricao: "Cafeteria aconchegante com grãos especiais e ambiente para trabalhar." },
  { id: 2, nome: "Parque das Águas", categoria: "Parque", cidade: "Curitiba", descricao: "Parque urbano com trilhas, lago e área para piquenique." },
  { id: 3, nome: "Museu da Imagem", categoria: "Museu", cidade: "Rio de Janeiro", descricao: "Acervo de fotografia e cinema brasileiro em um prédio histórico." },
  { id: 4, nome: "Sabor Caseiro", categoria: "Restaurante", cidade: "Belo Horizonte", descricao: "Comida mineira tradicional em porções generosas." },
  { id: 5, nome: "Livraria Página Viva", categoria: "Livraria", cidade: "Porto Alegre", descricao: "Livraria independente com café e eventos literários." },
  { id: 6, nome: "Cine Estrela", categoria: "Cinema", cidade: "São Paulo", descricao: "Cinema de rua com sessões de filmes clássicos e independentes." },
];

export const avaliacoes = [
  { id: 1, lugarId: 1, usuarioId: 1, nota: 5, comentario: "Melhor café da cidade!" },
  { id: 2, lugarId: 1, usuarioId: 2, nota: 4, comentario: "Ambiente ótimo, um pouco caro." },
  { id: 3, lugarId: 2, usuarioId: 1, nota: 5, comentario: "Perfeito para caminhar no fim de semana." },
  { id: 4, lugarId: 2, usuarioId: 3, nota: 3, comentario: "Bonito, mas precisa de mais bancos." },
  { id: 5, lugarId: 3, usuarioId: 4, nota: 4, comentario: "Acervo impressionante." },
  { id: 6, lugarId: 4, usuarioId: 2, nota: 5, comentario: "Comida excelente, porções generosas." },
  { id: 7, lugarId: 4, usuarioId: 3, nota: 2, comentario: "Demorou muito para servir." },
  { id: 8, lugarId: 5, usuarioId: 4, nota: 5, comentario: "Adorei os eventos literários." },
  { id: 9, lugarId: 6, usuarioId: 1, nota: 3, comentario: "Cadeiras pouco confortáveis." },
];

let proximoIdAvaliacao = avaliacoes.length + 1;

export function gerarProximoIdAvaliacao() {
  return proximoIdAvaliacao++;
}
