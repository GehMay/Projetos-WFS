import { pool } from "../bancoDados.js";

export async function listarLugares() {
  // TODO (Aula 10): rode `SELECT id, nome, categoria, cidade, descricao
  // FROM lugares ORDER BY id` usando `pool.query(...)`.
  //
  // `pool.query(sql)` retorna uma Promise que resolve para um array
  // `[linhas, colunas]` — o que você quer é `linhas` (a primeira
  // posição). Dica:
  //   const [linhas] = await pool.query("SELECT ...");
  //   return linhas;
}

export async function buscarLugarPorId(id) {
  // TODO (Aula 10): rode `SELECT id, nome, categoria, cidade, descricao
  // FROM lugares WHERE id = ?` usando `pool.query(sql, [id])` — o `?`
  // é substituído pelo valor de forma segura (evita SQL injection).
  //
  // `linhas` será um array. Se o lugar existir, `linhas[0]` é o
  // registro; se não existir, `linhas` estará vazio — retorne `null`
  // nesse caso (dica: `linhas[0] ?? null`).
}
