import { Router } from "express";
import { listarLugares, buscarLugarPorId } from "../repositorios/lugaresRepositorio.js";
import {
  listarTodasAvaliacoes,
  listarAvaliacoesPorLugar,
  criarAvaliacao,
  buscarAvaliacaoPorId,
  atualizarAvaliacao,
  apagarAvaliacao,
} from "../repositorios/avaliacoesRepositorio.js";
import { calcularMedia } from "../utilitarios/avaliacoes.js";
import { exigirAutenticacao } from "../middlewares/autenticacao.js";

const router = Router();

// GET /lugares — lista todos os lugares, cada um já com a nota média.
router.get("/", async (req, res) => {
  const [lugares, avaliacoes] = await Promise.all([listarLugares(), listarTodasAvaliacoes()]);

  const lugaresComNota = lugares.map((lugar) => ({
    ...lugar,
    notaMedia: calcularMedia(avaliacoes.filter((avaliacao) => avaliacao.lugarId === lugar.id)),
  }));

  res.json(lugaresComNota);
});

// GET /lugares/:id — um lugar específico, com nota média e avaliações.
router.get("/:id", async (req, res) => {
  const lugarId = Number(req.params.id);
  const lugar = await buscarLugarPorId(lugarId);

  if (!lugar) {
    return res.status(404).json({ erro: "Lugar não encontrado." });
  }

  const avaliacoesDoLugar = await listarAvaliacoesPorLugar(lugarId);
  res.json({
    ...lugar,
    notaMedia: calcularMedia(avaliacoesDoLugar),
    avaliacoes: avaliacoesDoLugar,
  });
});

// POST /lugares/:id/avaliacoes — cria uma avaliação para um lugar.
// Protegida: só usuários autenticados (com um token JWT válido) podem
// avaliar. `exigirAutenticacao` roda ANTES do handler da rota e, se o
// token for válido, disponibiliza `req.usuario` (id, nome, email).
router.post("/:id/avaliacoes", exigirAutenticacao, async (req, res) => {
  const lugarId = Number(req.params.id);
  const lugar = await buscarLugarPorId(lugarId);

  if (!lugar) {
    return res.status(404).json({ erro: "Lugar não encontrado." });
  }

  const { nota, comentario } = req.body;

  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    return res.status(400).json({ erro: "Nota deve ser um número inteiro entre 1 e 5." });
  }
  if (typeof comentario !== "string" || comentario.trim().length < 3) {
    return res.status(400).json({ erro: "Comentário deve ter pelo menos 3 caracteres." });
  }

  const novaAvaliacao = await criarAvaliacao({
    nota,
    comentario: comentario.trim(),
    lugarId,
    usuarioId: req.usuario.id,
  });

  res.status(201).json(novaAvaliacao);
});

// PATCH /lugares/:id/avaliacoes/:avaliacaoId — edita UMA avaliação.
// Autenticação garante QUEM é o usuário; a checagem abaixo garante que
// ele só edita avaliações que são DELE — isso é autorização, uma
// pergunta diferente de "você está logado?".
router.patch("/:id/avaliacoes/:avaliacaoId", exigirAutenticacao, async (req, res) => {
  const avaliacaoId = Number(req.params.avaliacaoId);
  const avaliacao = await buscarAvaliacaoPorId(avaliacaoId);

  if (!avaliacao || avaliacao.lugarId !== Number(req.params.id)) {
    return res.status(404).json({ erro: "Avaliação não encontrada." });
  }
  if (avaliacao.usuarioId !== req.usuario.id) {
    return res.status(403).json({ erro: "Você só pode editar suas próprias avaliações." });
  }

  const { nota, comentario } = req.body;

  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    return res.status(400).json({ erro: "Nota deve ser um número inteiro entre 1 e 5." });
  }
  if (typeof comentario !== "string" || comentario.trim().length < 3) {
    return res.status(400).json({ erro: "Comentário deve ter pelo menos 3 caracteres." });
  }

  const avaliacaoAtualizada = await atualizarAvaliacao(avaliacaoId, {
    nota,
    comentario: comentario.trim(),
  });

  res.json(avaliacaoAtualizada);
});

// DELETE /lugares/:id/avaliacoes/:avaliacaoId — apaga UMA avaliação.
// Mesma checagem de dono da rota de edição.
router.delete("/:id/avaliacoes/:avaliacaoId", exigirAutenticacao, async (req, res) => {
  const avaliacaoId = Number(req.params.avaliacaoId);
  const avaliacao = await buscarAvaliacaoPorId(avaliacaoId);

  if (!avaliacao || avaliacao.lugarId !== Number(req.params.id)) {
    return res.status(404).json({ erro: "Avaliação não encontrada." });
  }
  if (avaliacao.usuarioId !== req.usuario.id) {
    return res.status(403).json({ erro: "Você só pode apagar suas próprias avaliações." });
  }

  await apagarAvaliacao(avaliacaoId);
  res.status(204).send();
});

export default router;
