// Dados mockados da Plataforma de Avaliações.
// Nas próximas aulas esses dados vão parar de ser fixos e passar a vir
// de um JSON (aula 04) e, depois, de uma API de verdade (aula 09+).

var lugaresMock = [
  { id: 1, nome: "Café Aroma", categoria: "Cafeteria", cidade: "São Paulo" },
  { id: 2, nome: "Parque das Águas", categoria: "Parque", cidade: "Curitiba" },
  { id: 3, nome: "Museu da Imagem", categoria: "Museu", cidade: "Rio de Janeiro" },
  { id: 4, nome: "Sabor Caseiro", categoria: "Restaurante", cidade: "Belo Horizonte" },
  { id: 5, nome: "Livraria Página Viva", categoria: "Livraria", cidade: "Porto Alegre" },
  { id: 6, nome: "Cine Estrela", categoria: "Cinema", cidade: "São Paulo" }
];

var usuariosMock = [
  { id: 1, nome: "Marina Souza" },
  { id: 2, nome: "Diego Lima" },
  { id: 3, nome: "Beatriz Alves" },
  { id: 4, nome: "Pedro Nogueira" }
];

var avaliacoesMock = [
  { id: 1, lugarId: 1, usuarioId: 1, nota: 5, comentario: "Melhor café da cidade!" },
  { id: 2, lugarId: 1, usuarioId: 2, nota: 4, comentario: "Ambiente ótimo, um pouco caro." },
  { id: 3, lugarId: 2, usuarioId: 1, nota: 5, comentario: "Perfeito para caminhar no fim de semana." },
  { id: 4, lugarId: 2, usuarioId: 3, nota: 3, comentario: "Bonito, mas precisa de mais bancos." },
  { id: 5, lugarId: 3, usuarioId: 4, nota: 4, comentario: "Acervo impressionante." },
  { id: 6, lugarId: 4, usuarioId: 2, nota: 5, comentario: "Comida excelente, porções generosas." },
  { id: 7, lugarId: 4, usuarioId: 3, nota: 2, comentario: "Demorou muito para servir." },
  { id: 8, lugarId: 5, usuarioId: 4, nota: 5, comentario: "Adorei os eventos literários." },
  { id: 9, lugarId: 6, usuarioId: 1, nota: 3, comentario: "Cadeiras pouco confortáveis." }
];
