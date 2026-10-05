import { pool } from "../bancoDados.js";

export async function listarLugares() {
  const [linhas] = await pool.query(
    "SELECT id, nome, categoria, cidade, descricao FROM lugares ORDER BY id"
  )
  return linhas
}

export async function buscarLugarPorId(id) {
  const [linhas] = await pool.query(
    "SELECT id, nome, categoria, cidade, descricao FROM lugares WHERE id=?" [id]
  )
  return linhas[0] ?? null
}
