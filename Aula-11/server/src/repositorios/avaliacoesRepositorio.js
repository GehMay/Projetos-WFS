import { pool } from "../bancoDados.js";

export async function listarTodasAvaliacoes() {
  const [linhas] = await pool.query(
    "SELECT id, nota, comentario, lugar_id AS lugarId, usuario_id AS usuarioId FROM avaliacoes ORDER BY id"
  );
  return linhas;
}

export async function listarAvaliacoesPorLugar(lugarId) {
  const [linhas] = await pool.query(
    "SELECT id, nota, comentario, lugar_id AS lugarId, usuario_id AS usuarioId FROM avaliacoes WHERE lugar_id = ? ORDER BY id",
    [lugarId]
  );
  return linhas;
}

export async function criarAvaliacao({ nota, comentario, lugarId, usuarioId }) {
  const [resultado] = await pool.query(
    "INSERT INTO avaliacoes (nota, comentario, lugar_id, usuario_id) VALUES (?, ?, ?, ?)",
    [nota, comentario, lugarId, usuarioId]
  );
  return { id: resultado.insertId, nota, comentario, lugarId, usuarioId };
}

export async function buscarAvaliacaoPorId(id) {
  const [linhas] = await pool.query(
    "SELECT id, nota, comentario, lugar_id AS lugarId, usuario_id AS usuarioId FROM avaliacoes WHERE id = ?",
    [id]
  );
  return linhas[0] ?? null;
}

export async function atualizarAvaliacao(id, { nota, comentario }) {
  await pool.query("UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id = ?", [
    nota,
    comentario,
    id,
  ]);
  return buscarAvaliacaoPorId(id);
}

export async function apagarAvaliacao(id) {
  await pool.query("DELETE FROM avaliacoes WHERE id = ?", [id]);
}
