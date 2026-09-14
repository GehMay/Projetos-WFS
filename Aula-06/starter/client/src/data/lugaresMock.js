// Dados mockados para as aulas de componentes (06). A partir da aula 07
// esses dados vão parar de ser fixos e passar a vir de um "serviço"
// (fetch), com a mesma forma (mesmos campos) que já usamos aqui.

export const lugaresMock = [
  {
    id: 1,
    nome: "Café Aroma",
    categoria: "Cafeteria",
    cidade: "São Paulo",
    descricao: "Cafeteria aconchegante com grãos especiais e ambiente para trabalhar.",
    notaMedia: 4.5,
  },
  {
    id: 2,
    nome: "Parque das Águas",
    categoria: "Parque",
    cidade: "Curitiba",
    descricao: "Parque urbano com trilhas, lago e área para piquenique.",
    notaMedia: 4,
  },
  {
    id: 3,
    nome: "Museu da Imagem",
    categoria: "Museu",
    cidade: "Rio de Janeiro",
    descricao: "Acervo de fotografia e cinema brasileiro em um prédio histórico.",
    notaMedia: 4,
  },
  {
    id: 4,
    nome: "Sabor Caseiro",
    categoria: "Restaurante",
    cidade: "Belo Horizonte",
    descricao: "Comida mineira tradicional em porções generosas.",
    notaMedia: 3.5,
  },
  {
    id: 5,
    nome: "Livraria Página Viva",
    categoria: "Livraria",
    cidade: "Porto Alegre",
    descricao: "Livraria independente com café e eventos literários.",
    notaMedia: 5,
  },
  {
    id: 6,
    nome: "Cine Estrela",
    categoria: "Cinema",
    cidade: "São Paulo",
    descricao: "Cinema de rua com sessões de filmes clássicos e independentes.",
    notaMedia: 3,
  },
  {
    id: 7,
    nome: "Cine Estrela",
    categoria: "Cinema",
    cidade: "São Paulo",
    descricao: "Cinema de rua com sessões de filmes clássicos e independentes.",
    notaMedia: 1,
  },
];

export const ICONES_CATEGORIA = {
  Cafeteria: "☕",
  Parque: "🌳",
  Museu: "🖼️",
  Restaurante: "🍽️",
  Livraria: "📚",
  Cinema: "🎬",
};
