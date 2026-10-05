import { Router } from "express";
import { listarLugares, buscarLugarPorId } from "../repositorios/lugaresRepositorio.js";
import {
  listarTodasAvaliacoes,
  listarAvaliacoesPorLugar,
  criarAvaliacao,
} from "../repositorios/avaliacoesRepositorio.js";
import { calcularMedia } from "../utilitarios/avaliacoes.js";

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
router.post("/:id/avaliacoes", async (req, res) => {
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

  // usuarioId fixo por enquanto — login de verdade (JWT) chega na aula 11.
  const novaAvaliacao = await criarAvaliacao({
    nota,
    comentario: comentario.trim(),
    lugarId,
    usuarioId: 1,
  });

  res.status(201).json(novaAvaliacao);
});

export default router;
