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
  const senhaHash = await bcrypt.hash(senha, 10)

  try{
    const usuario = await criarUsuario({
      nome: nome.trim(),
      email: emailNormalizado,
      senhaHash,
    });
  } catch (erro){
    if(erro.code === "ER_DUP_ENTRY"){
      return res.status(404).json({erro: "Este email já é cadastrado"})
    }
    throw erro
  }
});

// POST /auth/login — autentica e devolve um token JWT.
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (typeof email !== "string" || typeof senha !== "string") {
    return res.status(400).json({ erro: "Informe email e senha." });
  }

  const usuario = await buscarUsuarioPorEmail(email.trim().toLowerCase())

  // Mensagem genérica de propósito: não revelamos se o problema foi o
  // email ou a senha, para não ajudar quem está tentando adivinhar.
  const credenciaisInvalidas = () =>
    res.status(401).json({ erro: "Email ou senha inválidos." });
  if (!usuario) {
    return credenciaisInvalidas()
  }
  const senhaConfere = await bcrypt.compare(senha, usuario.senhaHash)
  if (!senhaConfere) {
    return credenciaisInvalidas()
  }
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })
  res.json({token, usuario: payload})
});

export default router;
