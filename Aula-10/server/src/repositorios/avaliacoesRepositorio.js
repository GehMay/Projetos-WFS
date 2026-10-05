import { pool } from "../bancoDados.js";

export async function listarTodasAvaliacoes() {
  const [linhas] = await pool.query(
    "SELECT id, nota, comentario, lugar_id AS lugarID, usuario_id AS usuarioId FROM avaliacoes ORDER BY id"
  )
  return linhas  
}

export async function listarAvaliacoesPorLugar(lugarId) {
  const [linhas] = await pool.query(
    "SELECT id, nota, comentario, lugar_id AS lugarID, usuario_id AS usuarioId FROM avaliacoes WHERE lugar_id = ? ORDER BY id", [lugarId]    
  )
  return linhas
}

export async function criarAvaliacao({ nota, comentario, lugarId, usuarioId }) {
  const [resultado] = await pool.query(
    "INSERT INTO avaliacoes (nota, comentario, lugar_id, usuario_id) VALUES (?, ?, ?, ?)", {nota, comentario, lugarId, usuarioId}
  )
  return {id: resultado.insertId, nota, comentario, lugarId, usuarioId}
}
