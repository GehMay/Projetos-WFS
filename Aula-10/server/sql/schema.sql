-- Schema da Plataforma de Avaliações.
-- Rode este script uma vez no MySQL Workbench (ou via `mysql` CLI)
-- conectado como um usuário com permissão de criar bancos (ex: root).
--
-- Se precisar rodar de novo do zero, descomente a linha DROP DATABASE
-- abaixo.

-- DROP DATABASE IF EXISTS avaliacoes;

CREATE DATABASE IF NOT EXISTS avaliacoes
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE avaliacoes;

CREATE TABLE IF NOT EXISTS lugares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nota TINYINT NOT NULL,
  comentario TEXT NOT NULL,
  lugar_id INT NOT NULL,
  usuario_id INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lugar_id) REFERENCES lugares(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT chk_nota CHECK (nota BETWEEN 1 AND 5)
);

-- Dados de exemplo (mesmos das aulas anteriores). A ordem importa: os
-- ids gerados por AUTO_INCREMENT (1, 2, 3...) precisam bater com os
-- `lugar_id`/`usuario_id` usados no INSERT de avaliacoes logo abaixo.

INSERT INTO lugares (nome, categoria, cidade, descricao) VALUES
  ('Café Aroma', 'Cafeteria', 'São Paulo', 'Cafeteria aconchegante com grãos especiais e ambiente para trabalhar.'),
  ('Parque das Águas', 'Parque', 'Curitiba', 'Parque urbano com trilhas, lago e área para piquenique.'),
  ('Museu da Imagem', 'Museu', 'Rio de Janeiro', 'Acervo de fotografia e cinema brasileiro em um prédio histórico.'),
  ('Sabor Caseiro', 'Restaurante', 'Belo Horizonte', 'Comida mineira tradicional em porções generosas.'),
  ('Livraria Página Viva', 'Livraria', 'Porto Alegre', 'Livraria independente com café e eventos literários.'),
  ('Cine Estrela', 'Cinema', 'São Paulo', 'Cinema de rua com sessões de filmes clássicos e independentes.');

-- senha_hash ainda é um valor de exemplo (não é um hash bcrypt de
-- verdade) — login de usuário real só existe a partir da aula 11.
INSERT INTO usuarios (nome, email, senha_hash) VALUES
  ('Marina Souza', 'marina@example.com', 'defina-na-aula-11'),
  ('Diego Lima', 'diego@example.com', 'defina-na-aula-11'),
  ('Beatriz Alves', 'beatriz@example.com', 'defina-na-aula-11'),
  ('Pedro Nogueira', 'pedro@example.com', 'defina-na-aula-11');

INSERT INTO avaliacoes (nota, comentario, lugar_id, usuario_id) VALUES
  (5, 'Melhor café da cidade!', 1, 1),
  (4, 'Ambiente ótimo, um pouco caro.', 1, 2),
  (5, 'Perfeito para caminhar no fim de semana.', 2, 1),
  (3, 'Bonito, mas precisa de mais bancos.', 2, 3),
  (4, 'Acervo impressionante.', 3, 4),
  (5, 'Comida excelente, porções generosas.', 4, 2),
  (2, 'Demorou muito para servir.', 4, 3),
  (5, 'Adorei os eventos literários.', 5, 4),
  (3, 'Cadeiras pouco confortáveis.', 6, 1);
