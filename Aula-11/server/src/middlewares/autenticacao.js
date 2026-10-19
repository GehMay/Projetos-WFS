import jwt from "jsonwebtoken";

/**
 * Middleware que exige um token JWT válido no header Authorization.
 * Formato esperado: "Authorization: Bearer <token>".
 *
 * Se o token for válido, guarda os dados do usuário em `req.usuario` e
 * chama `next()` para seguir para a rota. Caso contrário, responde
 * 401 (não autenticado) e interrompe a requisição.
 */
export function exigirAutenticacao(req, res, next) {
  // TODO (Aula 11):
  // 1. Pegue `req.headers.authorization`. Se não existir, ou não
  //    começar com "Bearer ", responda 401 com
  //    `res.status(401).json({ erro: "Token de autenticação ausente." })`
  //    e pare (return).
  // 2. Extraia o token (tudo depois de "Bearer "):
  //    `cabecalho.slice("Bearer ".length)`.
  // 3. Dentro de um try/catch, chame
  //    `jwt.verify(token, process.env.JWT_SECRET)` — se o token for
  //    inválido ou expirado, isso LANÇA uma exceção (por isso o
  //    try/catch).
  // 4. Se `jwt.verify` funcionar, ele retorna o payload que foi
  //    assinado no login (id, nome, email). Guarde isso em
  //    `req.usuario` e chame `next()`.
  // 5. No catch, responda 401 com uma mensagem apropriada.
}
