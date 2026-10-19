import jwt from "jsonwebtoken";

export function exigirAutenticacao(req, res, next) {
  const cabecalho = req.headers.authorization
  if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
    return res.status(401).json({erro: "Token de Autenticação Ausente"})
  }
  const token = cabecalho.slice("Bearer ".length)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = payload
    next()
  } catch {
    return res.status(401).json({erro: "Token de Autenticação Inválido ou Expirado"})
  }
}
