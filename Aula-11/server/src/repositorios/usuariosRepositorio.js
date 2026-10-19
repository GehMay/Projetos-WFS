import { pool } from "../bancoDados.js";

export async function criarUsuario({ nome, email, senhaHash }) {
  const [resultado] = await pool.query(
    "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
    [nome, email, senhaHash]
  );
  return { id: resultado.insertId, nome, email };
}

export async function buscarUsuarioPorEmail(email) {
  const [linhas] = await pool.query(
    "SELECT id, nome, email, senha_hash AS senhaHash FROM usuarios WHERE email = ?",
    [email]
  );
  return linhas[0] ?? null;
}

export async function buscarUsuarioPorId(id) {
  const [linhas] = await pool.query(
    "SELECT id, nome, email FROM usuarios WHERE id = ?",
    [id]
  );
  return linhas[0] ?? null;
}
