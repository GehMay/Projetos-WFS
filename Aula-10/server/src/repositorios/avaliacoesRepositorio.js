import { pool } from "../bancoDados.js";

export async function listarTodasAvaliacoes() {
  // TODO (Aula 10): rode um SELECT em `avaliacoes` trazendo
  // id, nota, comentario, lugar_id (como lugarId) e usuario_id (como
  // usuarioId) — os nomes das colunas no banco usam snake_case, mas o
  // resto do código (JS) espera camelCase, então use `AS` no SQL:
  //
  //   SELECT id, nota, comentario, lugar_id AS lugarId, usuario_id AS usuarioId
  //   FROM avaliacoes ORDER BY id
}

export async function listarAvaliacoesPorLugar(lugarId) {
  // TODO (Aula 10): igual à função acima, mas com `WHERE lugar_id = ?`
  // (passe `[lugarId]` como segundo argumento de `pool.query`).
}

export async function criarAvaliacao({ nota, comentario, lugarId, usuarioId }) {
  // TODO (Aula 10):
  // 1. Rode um INSERT:
  //    INSERT INTO avaliacoes (nota, comentario, lugar_id, usuario_id)
  //    VALUES (?, ?, ?, ?)
  //    passando `[nota, comentario, lugarId, usuarioId]`.
  // 2. `pool.query(...)` para um INSERT retorna `[resultado]`, onde
  //    `resultado.insertId` é o id gerado pelo AUTO_INCREMENT.
  // 3. Retorne um objeto representando a avaliação criada:
  //    `{ id: resultado.insertId, nota, comentario, lugarId, usuarioId }`
}
