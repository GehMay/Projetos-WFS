import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { criarUsuario, buscarUsuarioPorEmail } from "../repositorios/usuariosRepositorio.js";

const router = Router();

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /auth/registro — cria uma conta nova.
router.post("/registro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (typeof nome !== "string" || nome.trim().length < 2) {
    return res.status(400).json({ erro: "Nome deve ter pelo menos 2 caracteres." });
  }
  if (typeof email !== "string" || !REGEX_EMAIL.test(email)) {
    return res.status(400).json({ erro: "Email inválido." });
  }
  if (typeof senha !== "string" || senha.length < 6) {
    return res.status(400).json({ erro: "Senha deve ter pelo menos 6 caracteres." });
  }

  const emailNormalizado = email.trim().toLowerCase();

  // TODO (Aula 11):
  // 1. Gere o hash da senha com `await bcrypt.hash(senha, 10)` (10 é o
  //    "custo" do hash — nunca guarde `senha` em texto puro).
  // 2. Dentro de um try/catch, chame
  //    `criarUsuario({ nome: nome.trim(), email: emailNormalizado, senhaHash })`
  //    e responda `res.status(201).json(usuario)`.
  // 3. No catch: o banco tem uma constraint UNIQUE em `email` — se já
  //    existir um usuário com esse email, o MySQL lança um erro com
  //    `erro.code === "ER_DUP_ENTRY"`. Nesse caso, responda 409 com uma
  //    mensagem amigável. Qualquer OUTRO erro, relance (`throw erro`)
  //    — não esconda erros inesperados.
});

// POST /auth/login — autentica e devolve um token JWT.
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (typeof email !== "string" || typeof senha !== "string") {
    return res.status(400).json({ erro: "Informe email e senha." });
  }

  // Mensagem genérica de propósito: não revelamos se o problema foi o
  // email ou a senha, para não ajudar quem está tentando adivinhar.
  const credenciaisInvalidas = () =>
    res.status(401).json({ erro: "Email ou senha inválidos." });

  // TODO (Aula 11):
  // 1. Busque o usuário com `buscarUsuarioPorEmail(email.trim().toLowerCase())`.
  //    Se não existir, chame `return credenciaisInvalidas();`.
  // 2. Compare a senha recebida com o hash salvo:
  //    `await bcrypt.compare(senha, usuario.senhaHash)`. Se não bater,
  //    chame `return credenciaisInvalidas();` também (mesma mensagem —
  //    não dê pistas sobre qual dos dois campos errou).
  // 3. Se bateu, monte o payload `{ id, nome, email }` do usuário e
  //    assine um token: `jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })`.
  // 4. Responda `res.json({ token, usuario: payload })`.
});

export default router;
